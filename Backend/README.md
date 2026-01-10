# PDF Summarization Project - Backend

A comprehensive FastAPI-based backend service for PDF text extraction, cleaning, and summarization using both extractive and abstractive methods.

## Features

- **PDF Upload & Management**: Upload, list, and delete PDF files
- **Text Extraction**: Extract text from PDFs with OCR support for scanned documents
- **Text Cleaning**: Normalize and clean extracted text with various options
- **Text Summarization**:
  - Extractive summarization (TextRank, TF-IDF, LSA)
  - Abstractive summarization (Transformer models)
  - Hybrid summarization (combining both methods)

## Project Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI entry point
│   │
│   ├── routers/                 # All API endpoints
│   │   ├── upload.py            # File upload endpoints
│   │   ├── extract.py           # PDF extraction endpoints
│   │   ├── clean.py             # Cleaning & normalization endpoints
│   │   ├── summarize.py         # Summarization endpoints (extractive + abstractive)
│   │
│   ├── services/                # Business logic layer
│   │   ├── file_handler.py      # Handles file saving
│   │   ├── extractor.py         # PDF text + OCR extraction logic
│   │   ├── cleaner.py           # Cleaning + normalization logic
│   │   ├── summarizer.py        # Summarization logic (extractive + abstractive)
│   │
│   ├── utils/                   # Helper functions
│   │   ├── validators.py        # File validation helpers
│   │   ├── text_utils.py        # Sentence splitting, stopword removal, etc.
│   │
│   ├── uploads/                 # Uploaded PDFs
│   ├── outputs/                 # Extracted + cleaned + summarized text outputs
│   └── __init__.py
│
├── requirements.txt             # Python dependencies
└── README.md                    # Project info
```

## Installation

1. **Create a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Download NLTK data:**
   ```python
   import nltk
   nltk.download('punkt')
   nltk.download('stopwords')
   ```

## Usage

1. **Start the server:**

   ```bash
   cd app
   python main.py
   ```

   Or using uvicorn directly:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Access the API:**
   - API Documentation: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc
   - Health check: http://localhost:8000/health

## API Endpoints

### Upload Endpoints (`/api/upload`)

- `POST /pdf` - Upload a PDF file
- `GET /files` - List uploaded files
- `DELETE /pdf/{filename}` - Delete a PDF file

### Extraction Endpoints (`/api/extract`)

- `POST /text/{filename}` - Extract text from PDF
- `GET /text/{filename}` - Get previously extracted text
- `GET /info/{filename}` - Get PDF file information

### Cleaning Endpoints (`/api/clean`)

- `POST /text/{filename}` - Clean extracted text
- `GET /text/{filename}` - Get previously cleaned text
- `POST /preview/{filename}` - Preview text cleaning

### Summarization Endpoints (`/api/summarize`)

- `POST /extractive/{filename}` - Generate extractive summary
- `POST /abstractive/{filename}` - Generate abstractive summary
- `POST /hybrid/{filename}` - Generate hybrid summary
- `GET /summary/{filename}` - Get previously generated summary

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Optional: Configure CORS origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Optional: Configure file upload limits
MAX_FILE_SIZE=10485760  # 10MB in bytes

# Optional: Configure model settings
DEFAULT_ABSTRACTIVE_MODEL=t5-small
```

## Dependencies

### Core Dependencies

- **FastAPI**: Modern web framework for building APIs
- **PyMuPDF**: PDF text extraction
- **pytesseract**: OCR for scanned PDFs
- **NLTK**: Natural language processing
- **scikit-learn**: Machine learning algorithms
- **transformers**: Hugging Face transformers for abstractive summarization

### Optional Dependencies

- **torch**: PyTorch for deep learning models
- **pandas**: Data manipulation
- **accelerate**: For faster model inference

## Development

### Code Style

- Use Black for code formatting
- Use Flake8 for linting
- Follow PEP 8 guidelines

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black app/
flake8 app/
```

## API Examples

### Upload a PDF

```bash
curl -X POST "http://localhost:8000/api/upload/pdf" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@document.pdf"
```

### Extract Text

```bash
curl -X POST "http://localhost:8000/api/extract/text/document.pdf?use_ocr=false"
```

### Clean Text

```bash
curl -X POST "http://localhost:8000/api/clean/text/document.pdf?remove_stopwords=true"
```

### Generate Summary

```bash
# Extractive
curl -X POST "http://localhost:8000/api/summarize/extractive/document.pdf?summary_ratio=0.3"

# Abstractive
curl -X POST "http://localhost:8000/api/summarize/abstractive/document.pdf?max_length=150"

# Hybrid
curl -X POST "http://localhost:8000/api/summarize/hybrid/document.pdf?extractive_ratio=0.5"
```

## Troubleshooting

### Common Issues

1. **NLTK Data Not Found**

   ```python
   import nltk
   nltk.download('punkt')
   nltk.download('stopwords')
   ```

2. **OCR Not Working**

   - Install Tesseract OCR on your system
   - Ensure pytesseract can find the tesseract executable

3. **Model Loading Issues**

   - Ensure you have sufficient disk space for model downloads
   - Check internet connection for model downloads

4. **Memory Issues**
   - Use smaller models for abstractive summarization
   - Process smaller chunks of text

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.

