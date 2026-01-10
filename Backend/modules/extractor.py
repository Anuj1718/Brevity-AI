import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io

# Optional: Agar PATH set nahi hua ho to yaha specify kar sakte ho
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_pdf(pdf_path, use_ocr=False):
    """
    Extract text from a PDF file.
    - Normal extraction ke liye PyMuPDF use hota hai
    - Agar page me text nahi mila aur use_ocr=True hai → OCR fallback
    """
    text = ""
    with fitz.open(pdf_path) as doc:
        for i, page in enumerate(doc):
            page_text = page.get_text("text")

            if not page_text.strip() and use_ocr:
                # Page ko image me convert karke OCR lagao
                pix = page.get_pixmap()
                img = Image.open(io.BytesIO(pix.tobytes("png")))
                page_text = pytesseract.image_to_string(img)

            text += f"\n\n--- Page {i+1} ---\n\n"
            text += page_text

    return text
