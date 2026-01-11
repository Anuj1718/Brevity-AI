# 🚀 Brevity AI - Intelligent PDF Summarization Platform

<div align="center">

![Brevity AI Banner](https://img.shields.io/badge/Brevity-AI-8b5cf6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjhsLTYtNnoiLz48cG9seWxpbmUgcG9pbnRzPSIxNCAyIDE0IDggMjAgOCIvPjxsaW5lIHgxPSIxNiIgeDI9IjgiIHkxPSIxMyIgeTI9IjEzIi8+PGxpbmUgeDE9IjE2IiB4Mj0iOCIgeTE9IjE3IiB5Mj0iMTciLz48cG9seWxpbmUgcG9pbnRzPSIxMCA5IDkgOSA4IDkiLz48L3N2Zz4=)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Hugging Face](https://img.shields.io/badge/🤗_Hugging_Face-FFD21E?style=flat-square)](https://huggingface.co/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)](https://render.com/)

**A full-stack AI-powered web application for extracting, summarizing, and translating PDF documents with multi-language support.**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Docs](#-api-endpoints)

</div>

---

## 📖 Overview

Brevity AI transforms lengthy PDF documents into concise, meaningful summaries using state-of-the-art NLP and machine learning models. Whether you have searchable PDFs or scanned documents, Brevity AI handles them all with advanced OCR capabilities and supports multiple Indian languages including Hindi and Marathi.

### ✨ What Makes It Special?

- **🎯 Triple Summarization**: Choose between Extractive, Abstractive, or Hybrid methods
- **🌐 Multi-Language**: Full support for English, Hindi, and Marathi
- **📷 Smart OCR**: Process scanned documents with intelligent image preprocessing
- **🔊 Text-to-Speech**: Listen to summaries in multiple languages
- **⚡ Real-time Progress**: Track upload and processing status live
- **🔐 Secure Auth**: Firebase-powered authentication system

---

## 🎯 Features

### Core Functionality
| Feature | Description |
|---------|-------------|
| 📄 **PDF Upload** | Drag & drop or click to upload PDFs up to 300MB |
| 🔍 **Text Extraction** | Extract text from both searchable and scanned PDFs |
| 🧹 **Text Cleaning** | Intelligent normalization, stopword removal, special character handling |
| 📝 **Summarization** | Three methods: Extractive (TextRank/TF-IDF/LSA), Abstractive (BART), Hybrid |
| 🌍 **Translation** | Translate summaries to Hindi or Marathi |
| 🔊 **TTS** | Text-to-Speech for summaries in multiple languages |

### Advanced Capabilities
- **Multi-language OCR** - Tesseract with English, Hindi, and Marathi support
- **Image Preprocessing** - OpenCV/PIL enhancement for better OCR accuracy
- **Auto Text Detection** - Identifies scanned vs searchable PDFs automatically
- **Resume Detection** - Structure-aware formatting for resume documents
- **Caching System** - Intelligent caching for improved performance
- **Parallel Processing** - Multi-threaded processing for large documents

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite 7** | Build Tool & Dev Server |
| **React Router 7** | Client-side Routing |
| **Firebase** | Authentication & Firestore |
| **React Dropzone** | File Upload Component |
| **Lottie & Spline** | Animations & 3D Graphics |
| **CSS Variables** | Theming & Design System |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API Framework |
| **Uvicorn** | ASGI Server |
| **PyMuPDF** | PDF Processing |
| **Tesseract OCR** | Optical Character Recognition |
| **NLTK** | NLP Utilities |
| **scikit-learn** | Extractive Summarization |
| **Transformers** | Abstractive Summarization |
| **PyTorch** | Deep Learning Backend |

### AI/ML Models
| Model | Use Case |
|-------|----------|
| **TextRank** | Graph-based extractive summarization |
| **TF-IDF + Cosine Similarity** | Importance-weighted extraction |
| **LSA (TruncatedSVD)** | Semantic analysis for extraction |
| **facebook/bart-large-cnn** | Abstractive summarization |
| **Helsinki-NLP/opus-mt-en-hi** | English→Hindi translation |
| **T5 Models** | English→Marathi translation |
| **Google Translate API** | Fallback translation provider |

### Deployment
| Platform | Component |
|----------|-----------|
| **Vercel** | Frontend hosting with edge CDN |
| **Render** | Backend hosting (Web Service) |
| **Firebase** | Auth & Database |

---

## 📁 Project Structure

```
Brevity-AI/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── routers/             # API endpoints
│   │   │   ├── upload.py        # File upload endpoints
│   │   │   ├── extract.py       # PDF extraction endpoints
│   │   │   ├── clean.py         # Text cleaning endpoints
│   │   │   ├── summarize.py     # Summarization endpoints
│   │   │   └── translate_summary.py  # Translation endpoints
│   │   ├── services/            # Business logic
│   │   │   ├── extractor.py     # PDF + OCR extraction
│   │   │   ├── cleaner.py       # Text normalization
│   │   │   ├── summarizer.py    # All summarization methods
│   │   │   └── translator.py    # Translation providers
│   │   └── utils/               # Helper functions
│   └── requirements.txt
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx              # Main app with routing
│   │   ├── components/
│   │   │   ├── Auth/            # Login, Signup, RequireAuth
│   │   │   ├── Home/            # Landing page, Features, FAQ
│   │   │   ├── Upload/          # Main upload & processing UI
│   │   │   ├── Marketing/       # Pricing, Services, Help
│   │   │   └── layout/          # Navbar, Footer
│   │   ├── context/             # React Context (Auth)
│   │   └── styles/              # Global CSS
│   ├── firebase/                # Firebase configuration
│   ├── vercel.json              # Vercel deployment config
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Tesseract OCR installed
- (Optional) CUDA for GPU acceleration

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

### Backend Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python download_nltk.py
uvicorn app.main:app --reload
```

---

## 🔌 API Endpoints

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/pdf` | Upload a PDF file |
| GET | `/api/upload/files` | List uploaded files |
| DELETE | `/api/upload/pdf/{filename}` | Delete a file |

### Extraction
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/extract/text/{filename}` | Extract text (with OCR options) |
| GET | `/api/extract/detect-text-type/{filename}` | Detect if PDF is scanned |

### Summarization
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/summarize/extractive/{filename}` | TextRank/TF-IDF/LSA summary |
| POST | `/api/summarize/abstractive/{filename}` | BART-based summary |
| POST | `/api/summarize/hybrid/{filename}` | Combined approach |
| POST | `/api/summarize/formatted-hybrid/{filename}` | Structure-aware summary |

### Translation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/translate/summary/{filename}` | Translate summary to Hindi/Marathi |
| GET | `/api/translate/languages` | Get supported languages |

---

## 🌐 Deployment

### Frontend → Vercel
1. Connect GitHub repository to Vercel
2. Set root directory to `Frontend`
3. Add environment variable: `VITE_API_URL`
4. Deploy!

### Backend → Render
1. Create a new Web Service on Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `cd Backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Configure environment variables
5. Deploy!

---

## 📊 Performance Optimizations

- **Pipeline-based processing** for 2-3x faster abstractive summarization
- **LRU caching** for similarity matrices and model inference
- **Thread pools** for parallel OCR processing
- **Chunked processing** for large documents
- **Image preprocessing** improves OCR accuracy by 30-40%

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Anuj](https://github.com/Anuj1718)**

</div>