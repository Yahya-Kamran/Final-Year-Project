import json
import os

def clean_notebook(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)
    
    clean_cells = []
    
    # Keywords to filter out entire cells
    filter_keywords = ['!pip install', '!nvidia-smi', 'Collecting ', 'Requirement already satisfied']
    
    for cell in nb.get('cells', []):
        source = "".join(cell.get('source', []))
        
        # Skip cells that are mostly installation or environment checks
        if any(kw in source for kw in filter_keywords):
            continue
            
        # Clear outputs to save space
        if cell['cell_type'] == 'code':
            cell['outputs'] = []
            cell['execution_count'] = None
        
        clean_cells.append(cell)
    
    nb['cells'] = clean_cells
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(nb, f, indent=1)

if __name__ == "__main__":
    input_file = r'c:\Users\Victus\Desktop\test\mobile-app\jupyter.ipynb'
    output_file = r'c:\Users\Victus\Desktop\test\backend\psl_model_training.ipynb'
    clean_notebook(input_file, output_file)
    print(f"Cleaned notebook saved to {output_file}")
