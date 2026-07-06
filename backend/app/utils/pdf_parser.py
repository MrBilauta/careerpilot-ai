"""
PDF text extraction utility.

Extracts text content from PDF files using PyPDF2. Handles common
edge cases like scanned PDFs, encrypted files, and malformed content.
"""

import io

from PyPDF2 import PdfReader


def extract_text_from_pdf(content: bytes) -> str:
    """
    Extract text from a PDF file's bytes content.

    Args:
        content: Raw bytes of the PDF file.

    Returns:
        Extracted text content as a single string.

    Raises:
        ValueError: If the PDF cannot be read or contains no extractable text.
    """
    try:
        reader = PdfReader(io.BytesIO(content))
        text_parts: list[str] = []

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text.strip())

        full_text = "\n\n".join(text_parts)

        if not full_text.strip():
            raise ValueError(
                "No text could be extracted from the PDF. "
                "The file may be scanned or image-based. "
                "Please use a PDF with selectable text."
            )

        return full_text

    except ValueError:
        raise
    except Exception as e:
        raise ValueError(f"Failed to parse PDF: {e}") from e
