"""
Enhanced Translation Router - Handles translation endpoints with multiple providers
"""

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from app.services.translator import EnhancedTranslator
from typing import Optional

router = APIRouter()
translator = EnhancedTranslator()

# -------------------------------
# Translate Text
# -------------------------------
@router.post("/text")
async def translate_text(
    text: str,
    target_language: str = Query("hindi", description="Target language (hindi, marathi, english)"),
    source_language: str = Query("en", description="Source language (default: en)"),
    provider: str = Query("auto", description="Translation provider (google, libre, local, auto)"),
    use_cache: bool = Query(True, description="Use caching for better performance")
):
    """
    Translate text using specified provider with fallback mechanisms.
    
    Args:
        text: Text to translate
        target_language: Target language (hindi, marathi, etc.)
        source_language: Source language (default: en)
        provider: Translation provider (google, libre, local, auto)
        use_cache: Whether to use caching
        
    Returns:
        JSON response with translation results
    """
    try:
        result = await translator.translate_text(
            text=text,
            target_language=target_language,
            source_language=source_language,
            provider=provider,
            use_cache=use_cache
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Text translated successfully",
                **result
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

# -------------------------------
# Translate Summary
# -------------------------------
@router.post("/summary/{filename}")
async def translate_summary(
    filename: str,
    summary_type: str = Query("hybrid", description="Type of summary (extractive, abstractive, hybrid, formatted_hybrid)"),
    target_language: str = Query("hindi", description="Target language (hindi, marathi, english)"),
    provider: str = Query("auto", description="Translation provider (google, libre, local, auto)")
):
    """
    Translate a summary file to target language.
    
    Args:
        filename: Name of the PDF file
        summary_type: Type of summary to translate
        target_language: Target language for translation
        provider: Translation provider to use
        
    Returns:
        JSON response with translated summary
    """
    try:
        result = await translator.translate_summary(
            filename=filename,
            summary_type=summary_type,
            target_language=target_language,
            provider=provider
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "message": f"{summary_type.title()} summary translated successfully",
                "filename": filename,
                **result
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"{summary_type.title()} summary not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summary translation failed: {str(e)}")

# -------------------------------
# Get Translated Summary
# -------------------------------
@router.get("/summary/{filename}")
async def get_translated_summary(
    filename: str,
    summary_type: str = Query("hybrid", description="Type of summary"),
    target_language: str = Query("hindi", description="Target language")
):
    """
    Get previously translated summary.
    
    Args:
        filename: Name of the PDF file
        summary_type: Type of summary
        target_language: Target language
        
    Returns:
        JSON response with translated summary
    """
    try:
        import os
        import json
        
        metadata_path = os.path.join(
            translator.output_dir,
            f"{os.path.splitext(filename)[0]}_{summary_type}_summary_{target_language}_metadata.json"
        )
        
        if not os.path.exists(metadata_path):
            raise FileNotFoundError(f"Translated {summary_type} summary not found")
        
        with open(metadata_path, 'r', encoding='utf-8') as f:
            result = json.load(f)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": f"Translated {summary_type} summary retrieved successfully",
                "filename": filename,
                **result
            }
        )
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Translated {summary_type} summary not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve translated summary: {str(e)}")

# -------------------------------
# Get Supported Languages
# -------------------------------
@router.get("/languages")
async def get_supported_languages():
    """
    Get list of supported languages by provider.
    
    Returns:
        JSON response with supported languages
    """
    try:
        languages = translator.get_supported_languages()
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Supported languages retrieved successfully",
                "supported_languages": languages,
                "language_codes": translator.language_codes
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get supported languages: {str(e)}")

# -------------------------------
# Legacy Endpoint (for backward compatibility)
# -------------------------------
@router.get("/summary/translate")
async def get_translated_summary_legacy(
    filename: str, 
    summary_type: str = Query("hybrid", description="Type of summary"),
    lang: str = Query("Hindi", description="Target language")
):
    """
    Legacy endpoint for backward compatibility.
    """
    try:
        # Convert legacy language format
        lang_mapping = {
            "Hindi": "hindi",
            "Marathi": "marathi", 
            "English": "english"
        }
        target_lang = lang_mapping.get(lang, lang.lower())
        
        result = await translator.translate_summary(
            filename=filename,
            summary_type=summary_type,
            target_language=target_lang,
            provider="auto"
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Legacy translation failed: {str(e)}")
