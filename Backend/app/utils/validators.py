"""
Validators - File validation helpers
"""

import os
from fastapi import UploadFile
from typing import List

# Allowed file extensions
ALLOWED_EXTENSIONS = {'.pdf'}

# Maximum file size (100MB for large PDFs)
MAX_FILE_SIZE = 100 * 1024 * 1024

def validate_pdf_file(file: UploadFile) -> bool:
    """
    Validate uploaded PDF file.
    
    Args:
        file: Uploaded file object
        
    Returns:
        bool: True if file is valid, False otherwise
    """
    # Check if file exists
    if not file:
        return False
    
    # Check file extension
    if not file.filename:
        return False
    
    file_extension = os.path.splitext(file.filename.lower())[1]
    if file_extension not in ALLOWED_EXTENSIONS:
        return False
    
    # Check file size (if available)
    if hasattr(file, 'size') and file.size > MAX_FILE_SIZE:
        return False
    
    return True

def validate_file_size(file_size: int) -> bool:
    """
    Validate file size.
    
    Args:
        file_size: Size of file in bytes
        
    Returns:
        bool: True if size is valid, False otherwise
    """
    return 0 < file_size <= MAX_FILE_SIZE

def validate_filename(filename: str) -> bool:
    """
    Validate filename.
    
    Args:
        filename: Name of the file
        
    Returns:
        bool: True if filename is valid, False otherwise
    """
    if not filename:
        return False
    
    # Check for invalid characters
    invalid_chars = ['<', '>', ':', '"', '|', '?', '*', '\\', '/']
    if any(char in filename for char in invalid_chars):
        return False
    
    # Check length
    if len(filename) > 255:
        return False
    
    return True

def get_file_extension(filename: str) -> str:
    """
    Get file extension from filename.
    
    Args:
        filename: Name of the file
        
    Returns:
        str: File extension (lowercase)
    """
    return os.path.splitext(filename.lower())[1]

def is_pdf_file(filename: str) -> bool:
    """
    Check if file is a PDF.
    
    Args:
        filename: Name of the file
        
    Returns:
        bool: True if file is PDF, False otherwise
    """
    return get_file_extension(filename) == '.pdf'

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename by removing invalid characters.
    
    Args:
        filename: Original filename
        
    Returns:
        str: Sanitized filename
    """
    # Remove invalid characters
    invalid_chars = ['<', '>', ':', '"', '|', '?', '*', '\\', '/']
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    
    # Limit length
    if len(filename) > 255:
        name, ext = os.path.splitext(filename)
        filename = name[:255-len(ext)] + ext
    
    return filename
