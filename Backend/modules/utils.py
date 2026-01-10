import os

def ensure_folder(folder_path):
    """Create folder if it does not exist"""
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

def save_text_to_file(text, output_path):
    """Save text to a file"""
    try:
        ensure_folder(os.path.dirname(output_path))
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Text saved: {output_path}")
    except Exception as e:
        print(f"Error saving text to {output_path}: {e}")
