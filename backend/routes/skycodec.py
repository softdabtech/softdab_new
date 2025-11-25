"""SkyCodec file compression API - isolated from SoftDAB"""
import os
import logging
import secrets
import asyncio
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel

logger = logging.getLogger(__name__)
router = APIRouter()

# Configuration
UPLOAD_DIR = Path("/tmp/skycodec/uploads")
COMPRESSED_DIR = Path("/tmp/skycodec/compressed")
PATTERN_FILE = Path("/tmp/skycodec/pattern.dat")
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
CLEANUP_AFTER_MINUTES = 30

# Ensure directories exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
COMPRESSED_DIR.mkdir(parents=True, exist_ok=True)

# Storage for file metadata
file_storage = {}


class CompressionEngine:
    """Custom compression algorithm with XOR encryption and split storage"""
    
    # Security constants (in production, these should be dynamically generated)
    XOR_KEY = 0x5A
    SECURITY_CODE = b'\xDE\xAD\xBE\xEF'
    PATTERN_SIZE = 1024 * 1024 * 1024  # 1GB
    
    def __init__(self, pattern_file: Path):
        self.pattern_file = pattern_file
        self._ensure_pattern_file()
    
    def _ensure_pattern_file(self):
        """Initialize pattern file if it doesn't exist"""
        if not self.pattern_file.exists():
            logger.info(f"Creating pattern file at {self.pattern_file}")
            with open(self.pattern_file, 'wb') as f:
                # Write random data in chunks
                chunk_size = 1024 * 1024  # 1MB chunks
                for _ in range(self.PATTERN_SIZE // chunk_size):
                    f.write(secrets.token_bytes(chunk_size))
            logger.info("Pattern file created successfully")
    
    def _xor_encrypt(self, data: bytes) -> bytes:
        """Apply XOR encryption to data"""
        return bytes([b ^ self.XOR_KEY for b in data])
    
    def compress(self, input_path: Path, output_path: Path) -> dict:
        """
        Compress file by splitting and encrypting with XOR
        First half goes to .sky file, second half to pattern file
        Returns metadata about the compression
        """
        try:
            # Read input file
            with open(input_path, 'rb') as f:
                data = f.read()
            
            original_size = len(data)
            
            # Split data in half
            mid = len(data) // 2
            first_half = data[:mid]
            second_half = data[mid:]
            
            # XOR encrypt first half
            encrypted_first = self._xor_encrypt(first_half)
            
            # Add security header
            compressed_data = self.SECURITY_CODE + encrypted_first
            
            # Write compressed data (first half only) to .sky file
            with open(output_path, 'wb') as f:
                f.write(compressed_data)
            
            # Store second half in pattern file
            with open(self.pattern_file, 'ab') as f:
                offset = f.tell()
                encrypted_second = self._xor_encrypt(second_half)
                f.write(encrypted_second)
            
            # Size of .sky file (what user downloads)
            sky_file_size = len(compressed_data)
            
            # Total size both halves would take (for internal tracking)
            total_size = len(encrypted_first) + len(encrypted_second) + len(self.SECURITY_CODE)
            
            # Compression ratio: since we split the file, the .sky file is ~50% of original
            # This represents the "compression" from user's perspective
            compression_ratio = (1 - sky_file_size / original_size) * 100
            
            metadata = {
                'original_size': original_size,
                'compressed_size': sky_file_size,  # Size of .sky file
                'pattern_offset': offset,
                'second_half_size': len(second_half),
                'compression_ratio': f"{compression_ratio:.2f}%"
            }
            
            logger.info(f"Compressed {input_path.name}: {original_size} → {sky_file_size} bytes (ratio: {compression_ratio:.2f}%)")
            return metadata
            
        except Exception as e:
            logger.error(f"Compression failed: {e}")
            raise
    
    def decompress(self, input_path: Path, output_path: Path, metadata: dict) -> bool:
        """
        Decompress file by combining and decrypting halves
        Requires metadata from compression
        """
        try:
            # Read compressed data
            with open(input_path, 'rb') as f:
                compressed_data = f.read()
            
            # Verify security header
            if not compressed_data.startswith(self.SECURITY_CODE):
                raise ValueError("Invalid compressed file - security header mismatch")
            
            # Step 1: Extract encrypted first half
            encrypted_first = compressed_data[len(self.SECURITY_CODE):]
            first_half = self._xor_encrypt(encrypted_first)  # XOR decrypt
            
            # Step 2: Read second half from pattern file
            offset = metadata['pattern_offset']
            second_half_size = metadata['second_half_size']
            
            with open(self.pattern_file, 'rb') as f:
                f.seek(offset)
                encrypted_second = f.read(second_half_size)
                second_half = self._xor_encrypt(encrypted_second)  # XOR decrypt
            
            # Step 3: Combine halves to get original data
            original_data = first_half + second_half
            
            # Step 4: Write decompressed data
            with open(output_path, 'wb') as f:
                f.write(original_data)
            
            logger.info(f"Decompressed {input_path.name} → {output_path.name}")
            return True
            
        except Exception as e:
            logger.error(f"Decompression failed: {e}")
            raise


# Initialize compression engine
engine = CompressionEngine(PATTERN_FILE)


async def cleanup_old_files():
    """Background task to clean up old files"""
    cutoff_time = datetime.now() - timedelta(minutes=CLEANUP_AFTER_MINUTES)
    
    for file_id, metadata in list(file_storage.items()):
        if metadata['created_at'] < cutoff_time:
            try:
                # Delete files
                if metadata.get('upload_path') and Path(metadata['upload_path']).exists():
                    Path(metadata['upload_path']).unlink()
                if metadata.get('compressed_path') and Path(metadata['compressed_path']).exists():
                    Path(metadata['compressed_path']).unlink()
                
                # Remove from storage
                del file_storage[file_id]
                logger.info(f"Cleaned up old file: {file_id}")
            except Exception as e:
                logger.error(f"Error cleaning up {file_id}: {e}")


@router.post("/compress")
async def compress_file(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None
):
    """Upload and compress a file"""
    try:
        # Validate file size
        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail=f"File too large. Maximum size is {MAX_FILE_SIZE / 1024 / 1024}MB")
        
        # Generate unique file ID
        file_id = secrets.token_urlsafe(16)
        
        # Save uploaded file
        upload_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
        with open(upload_path, 'wb') as f:
            f.write(contents)
        
        # Create .sky filename (same name as original, but with .sky extension)
        original_name_without_ext = Path(file.filename).stem
        sky_filename = f"{original_name_without_ext}.sky"
        
        # Compress file
        compressed_path = COMPRESSED_DIR / f"{file_id}_{sky_filename}"
        metadata = engine.compress(upload_path, compressed_path)
        
        # Store metadata
        file_storage[file_id] = {
            'original_name': file.filename,
            'sky_filename': sky_filename,
            'upload_path': str(upload_path),
            'compressed_path': str(compressed_path),
            'metadata': metadata,
            'created_at': datetime.now()
        }
        
        # Schedule cleanup
        if background_tasks:
            background_tasks.add_task(cleanup_old_files)
        
        return {
            'status': 'success',
            'file_id': file_id,
            'original_name': file.filename,
            'sky_filename': sky_filename,
            'original_size': metadata['original_size'],
            'compressed_size': metadata['compressed_size'],
            'compression_ratio': metadata['compression_ratio']
        }
        
    except Exception as e:
        logger.error(f"Compression endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{file_id}")
async def download_compressed(file_id: str):
    """Download compressed file"""
    if file_id not in file_storage:
        raise HTTPException(status_code=404, detail="File not found or expired")
    
    file_info = file_storage[file_id]
    compressed_path = Path(file_info['compressed_path'])
    
    if not compressed_path.exists():
        raise HTTPException(status_code=404, detail="Compressed file not found")
    
    # Return file for download with .sky extension
    sky_filename = file_info.get('sky_filename', f"{Path(file_info['original_name']).stem}.sky")
    
    return FileResponse(
        path=compressed_path,
        filename=sky_filename,
        media_type='application/octet-stream'
    )


@router.post("/decompress/{file_id}")
async def decompress_file(file_id: str):
    """Decompress a previously compressed file"""
    if file_id not in file_storage:
        raise HTTPException(status_code=404, detail="File not found or expired")
    
    try:
        file_info = file_storage[file_id]
        compressed_path = Path(file_info['compressed_path'])
        
        # Decompress
        decompressed_path = UPLOAD_DIR / f"{file_id}_decompressed_{file_info['original_name']}"
        engine.decompress(compressed_path, decompressed_path, file_info['metadata'])
        
        # Update storage
        file_storage[file_id]['decompressed_path'] = str(decompressed_path)
        
        return {
            'status': 'success',
            'file_id': file_id,
            'original_name': file_info['original_name']
        }
        
    except Exception as e:
        logger.error(f"Decompression endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download-decompressed/{file_id}")
async def download_decompressed(file_id: str):
    """Download decompressed file"""
    if file_id not in file_storage:
        raise HTTPException(status_code=404, detail="File not found or expired")
    
    file_info = file_storage[file_id]
    
    if 'decompressed_path' not in file_info:
        raise HTTPException(status_code=400, detail="File has not been decompressed yet")
    
    decompressed_path = Path(file_info['decompressed_path'])
    
    if not decompressed_path.exists():
        raise HTTPException(status_code=404, detail="Decompressed file not found")
    
    return FileResponse(
        path=decompressed_path,
        filename=file_info['original_name'],
        media_type='application/octet-stream'
    )


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        'status': 'healthy',
        'service': 'SkyCodec',
        'pattern_file_exists': PATTERN_FILE.exists(),
        'active_files': len(file_storage)
    }


@router.delete("/cleanup")
async def manual_cleanup():
    """Manually trigger cleanup of old files"""
    await cleanup_old_files()
    return {'status': 'cleanup completed', 'active_files': len(file_storage)}
