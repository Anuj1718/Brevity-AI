"""
Enhanced Extract Router - Handles PDF text extraction endpoints with OCR optimization
"""

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from app.services.extractor import EnhancedPDFExtractor
from typing import Optional

router = APIRouter()
extractor = EnhancedPDFExtractor()

@router.post("/text/{filename}")
async def extract_text(
    filename: str,
    use_ocr: bool = Query(False, description="Use OCR for scanned PDFs"),
    page_range: Optional[str] = Query(None, description="Page range (e.g., '1-5' or '1,3,5')"),
    lang: str = Query("eng+hin+mar", description="OCR languages (e.g., 'eng', 'hin', 'mar', or 'eng+hin+mar')"),
    chunk_size: int = Query(50, description="Number of pages to process at once (for large PDFs)"),
    ocr_quality: str = Query("high", description="OCR quality: low, medium, high"),
    preprocess_images: bool = Query(True, description="Preprocess images before OCR")
):
    """
    Enhanced text extraction from a PDF file with optimized OCR.
    
    Args:
        filename: Name of the PDF file
        use_ocr: Whether to use OCR for scanned PDFs
        page_range: Specific pages to extract (optional)
        lang: OCR languages
        chunk_size: Pages to process at once
        ocr_quality: OCR quality setting
        preprocess_images: Whether to preprocess images
        
    Returns:
        JSON response with extracted text and metadata
    """
    try:
        # Extract text with enhanced features
        result = await extractor.extract_text_from_pdf(
            filename=filename,
            use_ocr=use_ocr,
            page_range=page_range,
            lang=lang,
            chunk_size=chunk_size,
            ocr_quality=ocr_quality,
            preprocess_images=preprocess_images
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Text extracted successfully",
                "filename": filename,
                "extracted_text": result["text"],
                "page_count": result["page_count"],
                "extraction_method": result["method"],
                "file_path": result["file_path"],
                "ocr_stats": result.get("ocr_stats", {}),
                "ocr_quality": result.get("ocr_quality", "high"),
                "preprocessing_enabled": result.get("preprocessing_enabled", True)
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="PDF file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

@router.get("/text/{filename}")
async def get_extracted_text(filename: str):
    """
    Get previously extracted text from a PDF file.
    
    Args:
        filename: Name of the PDF file
        
    Returns:
        JSON response with extracted text
    """
    try:
        result = extractor.get_extracted_text(filename)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Extracted text retrieved successfully",
                "filename": filename,
                "extracted_text": result["text"],
                "page_count": result["page_count"],
                "extraction_method": result["method"],
                "ocr_stats": result.get("ocr_stats", {})
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Extracted text not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve text: {str(e)}")

@router.get("/info/{filename}")
async def get_pdf_info(filename: str):
    """
    Get PDF file information without extracting text.
    
    Args:
        filename: Name of the PDF file
        
    Returns:
        JSON response with PDF information
    """
    try:
        info = await extractor.get_pdf_info(filename)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "PDF information retrieved successfully",
                "filename": filename,
                "info": info
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="PDF file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get PDF info: {str(e)}")

@router.get("/detect-text-type/{filename}")
async def detect_text_type(
    filename: str,
    sample_pages: int = Query(3, description="Number of pages to sample for detection")
):
    """
    Detect if PDF contains searchable text or requires OCR.
    
    Args:
        filename: Name of the PDF file
        sample_pages: Number of pages to sample for analysis
        
    Returns:
        JSON response with text type detection results
    """
    try:
        detection_result = await extractor.detect_text_type(filename, sample_pages)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Text type detection completed",
                "filename": filename,
                "detection_result": detection_result
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="PDF file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text type detection failed: {str(e)}")
