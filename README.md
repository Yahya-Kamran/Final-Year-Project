# 🖐️ Khudsuno: AI-Powered Sign Language Recognition

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React Native](https://img.shields.io/badge/React_Native-v0.75-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![YOLOv11](https://img.shields.io/badge/YOLO-v11-FF6F00?logo=ultralytics&logoColor=white)](https://ultralytics.com/)

**Khudsuno** (Urdu for "Listen to yourself") is a cutting-edge accessibility project designed to bridge the communication gap for the deaf and hard-of-hearing community. By combining real-time computer vision with advanced Large Language Models (LLMs), Khudsuno translates sign language gestures into coherent, natural sentences.

---

## 🌟 Key Features

- **Real-time Gesture Detection**: Powered by **YOLOv11**, achieving high accuracy in recognizing diverse sign language alphabet and word gestures.
- **Skeletal Rigging**: Uses **MediaPipe** for precise hand landmark tracking and bone rigging, ensuring robust detection even in varied lighting.
- **Intelligent Sentence Synthesis**: Integrates **Meta LLaMA 2** to convert a stream of detected words into grammatically correct and contextually relevant sentences.
- **Cross-Platform Mobile App**: A sleek **React Native** frontend providing an intuitive user experience for real-time translation and profile management.
- **FastAPI Backend**: A high-performance asynchronous API handling the heavy lifting of ML inference.

---

## 🧠 Thought Process & Core Logic

The development of Khudsuno followed a rigorous engineering path to solve the "Isolated Word Problem" in sign language translation.

### 1. Model Training & Dataset
We utilized a custom-curated Pakistani Sign Language (PSL) dataset. The thought process was to use **YOLOv11n** (Nano) for its extreme efficiency on edge devices. By training on specific hand-gestures, we created a model that doesn't just detect objects, but interprets human intent through skeletal landmarks and rigging.

### 2. Multi-Threaded Execution Flow
To ensure a lag-free user experience, the backend operates on a sophisticated dual-thread architecture:

- **🧵 Thread 1: Real-time Perception (The Eyes)**
  - Constantly monitors the camera feed using **OpenCV**.
  - Processes each frame through the YOLOv11 model.
  - Implements a **temporal buffer**: A gesture must be held for a specific duration to be registered, filtering out accidental movements.
  - Detects "Sentence Breaks" based on a 5-second inactivity timer.

- **🧵 Thread 2: Natural Language Processing (The Brain)**
  - Receives the raw "bag of words" from Thread 1 via a thread-safe Queue.
  - Feeds these words into **Meta LLaMA 2**.
  - **The Magic**: LLaMA takes raw detections like `[ "hello", "help", "work" ]` and synthesizes them into a natural sentence: *"Hello, I need help with work."*
  - Sends the refined output back to the frontend via FastAPI.

### 3. Frontend Integration
The React Native app connects to the FastAPI backend via WebSockets/REST to display both the annotated video stream (showing the skeleton rigging) and the final translated sentences in real-time.

---

## 🏗️ Architecture

```mermaid
graph TD
    A[Mobile App - React Native] -->|Video Stream| B[FastAPI Backend]
    B --> C{Multi-Threaded Engine}
    C -->|Thread 1: CV| D[YOLOv11 + MediaPipe]
    D -->|Detected Words Queue| E[Thread 2: NLP]
    E -->|LLaMA 2 Inference| F[Coherent Sentences]
    F -->|JSON Response| B
    B -->|Live Feed + Text| A
```

---

## 🛠️ Tech Stack

- **Frontend**: React Native, React Navigation, Firebase
- **Backend**: FastAPI, Uvicorn, OpenCV
- **AI/ML**: Ultralytics YOLOv11, MediaPipe, Hugging Face (LLaMA 2)
- **Inference**: CUDA-accelerated 4-bit Quantized LLaMA (using BitsAndBytes)

---

## 📂 Project Structure

```text
├── mobile-app/                 # React Native Frontend
├── backend/                    # FastAPI Server & ML Logic
│   ├── server.py               # Production Entry Point (Multi-threaded)
│   ├── psl_training.ipynb      # Pakistani Sign Language Training Logic
│   ├── yolo_experiments.ipynb  # Inference & Debugging experiments
│   ├── data.yaml               # Dataset Configuration
│   └── requirements.txt        # Backend Dependencies
└── README.md                   # Project Documentation
```

---

## 🚀 Quick Start

### Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Configure your local model paths in `server.py`.
3. Run the server:
   ```bash
   python server.py
   ```

### Mobile Setup
1. Install dependencies: `npm install` inside `mobile-app`.
2. Run the app: `npx react-native run-android`.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
