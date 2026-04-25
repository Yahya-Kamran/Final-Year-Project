import cv2
import time
import threading
from queue import Queue
from ultralytics import YOLO
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

# =================== Load FastAPI ===================
app = FastAPI()

# ✅ Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =================== Load YOLO ===================
model_path = "C:/Users/Victus/Documents/saving_trained_models/yolov11_srs/debug_train/weights/best.pt"
model = YOLO(model_path)

# =================== Initialize Camera ===================
cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

# =================== Load LLaMA Model ===================
llm_model_path = r"C:\Users\Victus\Documents\LLAMA\models--meta-llama--Llama-2-7b-hf"

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
)

max_memory = {
    0: "5GiB",
    "cpu": "3GiB"
}

llm_model = AutoModelForCausalLM.from_pretrained(
    llm_model_path,
    device_map="auto",
    quantization_config=quantization_config,
    max_memory=max_memory,
    offload_folder="offload",
    offload_state_dict=True,
)

tokenizer = AutoTokenizer.from_pretrained(llm_model_path)

print("✅ LLM Model Successfully Loaded")

# =================== Global Variables ===================
current_word = None
word_start_time = None
last_added_word = None
current_sentence = []
no_word_detected_start = None
pause_time = 5
sentence_counter = 1

sentence_queue = Queue()
llm_output_queue = Queue()
processed_sentences = []

# =================== LLM Processing Thread ===================
def llm_processor():
    while True:
        sentence = sentence_queue.get()
        if sentence == "STOP":
            break
        input_text = " ".join(sentence)
        inputs = tokenizer(input_text, return_tensors="pt").to("cuda")
        outputs = llm_model.generate(**inputs, max_new_tokens=50)
        processed = tokenizer.decode(outputs[0], skip_special_tokens=True)
        llm_output_queue.put((sentence, processed))
        sentence_queue.task_done()

llm_thread = threading.Thread(target=llm_processor, daemon=True)
llm_thread.start()

# =================== Gesture Detection ===================
def detect_gestures():
    global current_word, word_start_time, last_added_word, current_sentence, no_word_detected_start, sentence_counter
    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Frame capture failed.")
            break

        time.sleep(0.1)
        results = model(frame, verbose=False)
        detected_word = None

        for result in results[0].boxes:
            cls = int(result.cls)
            detected_word = model.names[cls]
            break

        current_time = time.time()

        if detected_word:
            no_word_detected_start = None
            if detected_word != current_word:
                if current_word and current_time - word_start_time >= 1:
                    if current_word != last_added_word:
                        current_sentence.append(current_word)
                        last_added_word = current_word
                        print(f"🖐️ Detected: {current_word}")
                current_word = detected_word
                word_start_time = current_time
            else:
                if current_time - word_start_time >= 1 and detected_word != last_added_word:
                    current_sentence.append(detected_word)
                    last_added_word = detected_word
                    print(f"🖐️ Detected: {detected_word}")
        else:
            if no_word_detected_start is None:
                no_word_detected_start = current_time
            elif current_time - no_word_detected_start >= pause_time:
                if current_sentence:
                    sentence_queue.put(current_sentence)
                    print(f"\n📝 Sentence {sentence_counter}: {' '.join(current_sentence)}")
                    sentence_counter += 1
                    current_sentence = []
                no_word_detected_start = None

        while not llm_output_queue.empty():
            original, processed = llm_output_queue.get()
            processed_sentences.append((original, processed))
            print(f"\n🧠 Processed: {processed}")

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    sentence_queue.put("STOP")
    llm_thread.join()
    cap.release()
    cv2.destroyAllWindows()

# =================== MJPEG Video Stream ===================
def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break
        results = model(frame, verbose=False)
        annotated = results[0].plot()
        _, buffer = cv2.imencode('.jpg', annotated)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

# =================== API Routes ===================
@app.get("/latest_output/")
def latest_output():
    if processed_sentences:
        original, processed = processed_sentences[-1]
        return {
            "original": original,
            "processed": processed
        }
    return {
        "original": [],
        "processed": ""
    }

@app.get("/processed_sentences/")
def get_processed_sentences():
    return {"processed_sentences": processed_sentences}

@app.get("/sentences/")
def get_sentences():
    return {"sentences": [orig for orig, _ in processed_sentences]}

# =================== Run Threads and Server ===================
detection_thread = threading.Thread(target=detect_gestures, daemon=True)
detection_thread.start()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
