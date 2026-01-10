"""
File Handler Service - Handles file operations for uploaded PDFs
"""

import os
import shutil
from datetime import datetime
from typing import List, Dict, Any
from pathlib import Path

class FileHandler:
    """Handles file operations for uploaded PDFs."""
    
    def __init__(self):
        self.upload_dir = "uploads"
        self.output_dir = "outputs"
        self.ensure_directories()
    
    def ensure_directories(self):
        """Ensure upload and output directories exist."""
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)
    
    async def save_uploaded_file(self, file) -> str:
        """
        Save uploaded file to uploads directory.
        
        Args:
            file: Uploaded file object
            
        Returns:
            str: Path to saved file
        """
        # Generate unique filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{file.filename}"
        file_path = os.path.join(self.upload_dir, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return file_path
    
    def list_uploaded_files(self) -> List[Dict[str, Any]]:
        """
        List all uploaded PDF files.
        
        Returns:
            List of file information dictionaries
        """
        files = []
        for filename in os.listdir(self.upload_dir):
            if filename.lower().endswith('.pdf'):
                file_path = os.path.join(self.upload_dir, filename)
                file_stat = os.stat(file_path)
                files.append({
                    "filename": filename,
                    "file_path": file_path,
                    "size": file_stat.st_size,
                    "created": datetime.fromtimestamp(file_stat.st_ctime).isoformat(),
                    "modified": datetime.fromtimestamp(file_stat.st_mtime).isoformat()
                })
        
        return sorted(files, key=lambda x: x["created"], reverse=True)
    
    def delete_file(self, filename: str) -> bool:
        """
        Delete a file from uploads directory.
        
        Args:
            filename: Name of file to delete
            
        Returns:
            bool: True if deleted successfully, False otherwise
        """
        file_path = os.path.join(self.upload_dir, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    
    def get_file_path(self, filename: str) -> str:
        """
        Get full path for a filename.
        
        Args:
            filename: Name of the file
            
        Returns:
            str: Full path to the file
        """
        return os.path.join(self.upload_dir, filename)
    
    def file_exists(self, filename: str) -> bool:
        """
        Check if a file exists in uploads directory.
        
        Args:
            filename: Name of the file
            
        Returns:
            bool: True if file exists, False otherwise
        """
        file_path = os.path.join(self.upload_dir, filename)
        return os.path.exists(file_path)
    
    def get_file_size(self, filename: str) -> int:
        """
        Get file size in bytes.
        
        Args:
            filename: Name of the file
            
        Returns:
            int: File size in bytes
        """
        file_path = os.path.join(self.upload_dir, filename)
        if os.path.exists(file_path):
            return os.path.getsize(file_path)
        return 0
