"""
Helper Utilities for ResuMatch AI Server
========================================

This module contains utility functions used across the application to support
various operations such as file handling, string formatting, and common validations.
"""

import os
import secrets

def generate_unique_id(length=8):
    """
    Generates a secure, URL-safe unique identifier.
    
    Args:
        length (int): The number of bytes to generate (results in longer string).
        
    Returns:
        str: A URL-safe text string.
    """
    return secrets.token_urlsafe(length)

def format_file_size(size_in_bytes):
    """
    Formats a byte count into a human-readable string (e.g., '1.5 MB').
    
    Args:
        size_in_bytes (int): The size in bytes.
        
    Returns:
        str: Formatted string.
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_in_bytes < 1024:
            return f"{size_in_bytes:.2f} {unit}"
        size_in_bytes /= 1024
    return f"{size_in_bytes:.2f} TB"
