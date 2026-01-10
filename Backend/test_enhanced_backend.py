#!/usr/bin/env python3
"""
Test script for the enhanced PDF summarization backend
Tests the new optimized features and translation capabilities
"""

import asyncio
import os
import sys
import json
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

from app.services.extractor import EnhancedPDFExtractor
from app.services.summarizer import OptimizedTextSummarizer
from app.services.translator import EnhancedTranslator


async def test_extraction():
    """Test the enhanced PDF extraction with OCR."""
    print("🔍 Testing Enhanced PDF Extraction...")
    
    extractor = EnhancedPDFExtractor()
    
    # Test PDF info detection
    try:
        # Look for any PDF file in uploads
        uploads_dir = backend_dir / "uploads"
        pdf_files = list(uploads_dir.glob("*.pdf"))
        
        if not pdf_files:
            print("❌ No PDF files found in uploads directory")
            return False
        
        test_file = pdf_files[0].name
        print(f"📄 Testing with file: {test_file}")
        
        # Test text type detection
        detection_result = await extractor.detect_text_type(test_file)
        print(f"✅ Text type detection: {detection_result['text_type']}")
        print(f"   Recommendation: {detection_result['recommendation']}")
        
        # Test extraction with OCR
        extraction_result = await extractor.extract_text_from_pdf(
            filename=test_file,
            use_ocr=True,
            ocr_quality="high",
            preprocess_images=True
        )
        
        print(f"✅ Extraction completed: {extraction_result['page_count']} pages processed")
        print(f"   Method: {extraction_result['method']}")
        print(f"   OCR Stats: {extraction_result.get('ocr_stats', {})}")
        
        return True
        
    except Exception as e:
        print(f"❌ Extraction test failed: {str(e)}")
        return False


async def test_summarization():
    """Test the optimized summarization."""
    print("\n📝 Testing Optimized Summarization...")
    
    summarizer = OptimizedTextSummarizer()
    
    try:
        # Look for extracted text files
        outputs_dir = backend_dir / "outputs"
        extraction_files = list(outputs_dir.glob("*_extraction_metadata.json"))
        
        if not extraction_files:
            print("❌ No extraction metadata found. Run extraction test first.")
            return False
        
        # Get the first extraction file
        extraction_file = extraction_files[0]
        filename = extraction_file.stem.replace("_extraction_metadata", "")
        
        print(f"📄 Testing summarization with: {filename}")
        
        # Test extractive summary
        extractive_result = await summarizer.extractive_summary(
            filename=filename,
            summary_ratio=0.3,
            algorithm="textrank",
            use_cache=True
        )
        
        print(f"✅ Extractive summary: {len(extractive_result['summary_text'])} characters")
        print(f"   Compression ratio: {extractive_result['compression_ratio']:.2f}")
        
        # Test abstractive summary
        abstractive_result = await summarizer.abstractive_summary(
            filename=filename,
            max_length=150,
            min_length=30,
            use_pipeline=True
        )
        
        print(f"✅ Abstractive summary: {len(abstractive_result['summary_text'])} characters")
        print(f"   Processing method: {abstractive_result.get('processing_method', 'unknown')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Summarization test failed: {str(e)}")
        return False


async def test_translation():
    """Test the enhanced translation capabilities."""
    print("\n🌐 Testing Enhanced Translation...")
    
    translator = EnhancedTranslator()
    
    try:
        # Test text translation
        test_text = "This is a test document for translation. It contains multiple sentences to verify the translation quality."
        
        # Test Hindi translation
        hindi_result = await translator.translate_text(
            text=test_text,
            target_language="hindi",
            provider="auto"
        )
        
        print(f"✅ Hindi translation: {hindi_result['provider']}")
        print(f"   Original: {test_text[:50]}...")
        print(f"   Translated: {hindi_result['translated_text'][:50]}...")
        
        # Test Marathi translation
        marathi_result = await translator.translate_text(
            text=test_text,
            target_language="marathi",
            provider="auto"
        )
        
        print(f"✅ Marathi translation: {marathi_result['provider']}")
        print(f"   Translated: {marathi_result['translated_text'][:50]}...")
        
        # Test supported languages
        languages = translator.get_supported_languages()
        print(f"✅ Supported languages: {list(languages.keys())}")
        
        return True
        
    except Exception as e:
        print(f"❌ Translation test failed: {str(e)}")
        return False


async def test_integration():
    """Test the complete integration."""
    print("🚀 Testing Complete Integration...")
    
    try:
        # Run all tests
        extraction_success = await test_extraction()
        summarization_success = await test_summarization()
        translation_success = await test_translation()
        
        # Summary
        print("\n📊 Test Results Summary:")
        print(f"   Extraction: {'✅ PASS' if extraction_success else '❌ FAIL'}")
        print(f"   Summarization: {'✅ PASS' if summarization_success else '❌ FAIL'}")
        print(f"   Translation: {'✅ PASS' if translation_success else '❌ FAIL'}")
        
        overall_success = extraction_success and summarization_success and translation_success
        print(f"\n🎯 Overall Result: {'✅ ALL TESTS PASSED' if overall_success else '❌ SOME TESTS FAILED'}")
        
        return overall_success
        
    except Exception as e:
        print(f"❌ Integration test failed: {str(e)}")
        return False


async def main():
    """Main test function."""
    print("🧪 Enhanced PDF Summarization Backend Test Suite")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not (backend_dir / "app").exists():
        print(f"❌ Backend directory not found: {backend_dir}")
        print("Please run this script from the project root directory.")
        return
    
    # Run tests
    success = await test_integration()
    
    if success:
        print("\n🎉 All tests passed! Your enhanced backend is ready to use.")
        print("\n📋 New Features Available:")
        print("   • Optimized OCR with image preprocessing")
        print("   • Enhanced summarization with caching and pipelines")
        print("   • Multi-provider translation (Google, LibreTranslate, Local)")
        print("   • Text type detection for better OCR recommendations")
        print("   • Parallel processing for better performance")
    else:
        print("\n⚠️  Some tests failed. Check the error messages above.")
        print("   Make sure all dependencies are installed and PDF files are available.")


if __name__ == "__main__":
    asyncio.run(main())

