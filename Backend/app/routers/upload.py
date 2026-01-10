"""
Upload Router - Handles file upload endpoints
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.services.file_handler import FileHandler
from app.utils.validators import validate_pdf_file
import os

router = APIRouter()
file_handler = FileHandler()


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF file for processing.
    """
    try:
        # Validate file
        if not validate_pdf_file(file):
            raise HTTPException(status_code=400, detail="Invalid PDF file")

        # Save file
        file_path = await file_handler.save_uploaded_file(file)
        filename_only = os.path.basename(file_path)   # only filename (test5.pdf)

        return JSONResponse(
            status_code=200,
            content={
                "message": "File uploaded successfully",
                "filename": filename_only,
                "file_size": os.path.getsize(file_path)
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.get("/files")
async def list_uploaded_files():
    """
    List all uploaded PDF files.
    """
    try:
        files = file_handler.list_uploaded_files()
        return JSONResponse(
            status_code=200,
            content={
                "message": "Files retrieved successfully",
                "files": files
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list files: {str(e)}")


@router.delete("/pdf/{filename}")
async def delete_pdf(filename: str):
    """
    Delete an uploaded PDF file.
    """
    try:
        success = file_handler.delete_file(filename)
        if success:
            return JSONResponse(
                status_code=200,
                content={"message": f"File {filename} deleted successfully"}
            )
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")
