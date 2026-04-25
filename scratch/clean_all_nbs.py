import json
import os
import glob

def clean_notebook(input_path, output_path):
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            nb = json.load(f)
        
        clean_cells = []
        filter_keywords = ['!pip install', '!nvidia-smi', 'Collecting ', 'Requirement already satisfied']
        
        for cell in nb.get('cells', []):
            source = "".join(cell.get('source', []))
            if any(kw in source for kw in filter_keywords):
                continue
            if cell['cell_type'] == 'code':
                cell['outputs'] = []
                cell['execution_count'] = None
            clean_cells.append(cell)
        
        nb['cells'] = clean_cells
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(nb, f, indent=1)
        print(f"Cleaned {input_path} -> {output_path}")
    except Exception as e:
        print(f"Failed to clean {input_path}: {e}")

if __name__ == "__main__":
    # Clean the one in mobile-app
    clean_notebook(r'c:\Users\Victus\Desktop\test\mobile-app\jupyter.ipynb', r'c:\Users\Victus\Desktop\test\backend\psl_training.ipynb')
    # Clean the one in root
    clean_notebook(r'c:\Users\Victus\Desktop\test\jupyter.ipynb', r'c:\Users\Victus\Desktop\test\backend\yolo_experiments.ipynb')
    # Clean ex.ipynb if it exists
    if os.path.exists(r'c:\Users\Victus\Desktop\test\ex.ipynb'):
        clean_notebook(r'c:\Users\Victus\Desktop\test\ex.ipynb', r'c:\Users\Victus\Desktop\test\backend\example_logic.ipynb')
