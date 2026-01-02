from pdfminer.high_level import extract_text
import re

def extract_text_from_pdf(file_path):
    """
    Extracts raw text from a PDF file and cleans generic whitespace.
    """
    try:
        text = extract_text(file_path)
        # Clean up text: remove multiple newlines and extra spaces
        clean_text = re.sub(r'\s+', ' ', text).strip()
        return clean_text
    except Exception as e:
        raise Exception(f"Error parsing PDF: {str(e)}")