from modules.extractor import extract_text_from_pdf
from modules.utils import save_text_to_file

def main():
    pdf_path = "input_pdfs/scanned.pdf"
    output_path = "output/extracted_text.txt"

    # OCR enable karo agar scanned PDFs bhi handle karne hain
    extracted_text = extract_text_from_pdf(pdf_path, use_ocr=True)

    save_text_to_file(extracted_text, output_path)
    print("✅ Extraction complete! Check:", output_path)

if __name__ == "__main__":
    main()
