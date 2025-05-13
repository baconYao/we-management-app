import re

import flet as ft


def validate_email(email_field: ft.TextField, page: ft.Page) -> None:
    """Validate email format and update error text."""
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not email_field.value:
        email_field.error_text = "請輸入電子郵件"
    elif not re.match(email_pattern, email_field.value):
        email_field.error_text = "請輸入有效的電子郵件地址"
    else:
        email_field.error_text = None
    page.update()


def validate_password(password_field: ft.TextField, page: ft.Page) -> None:
    """Validate password strength and update error text."""
    if not password_field.value:
        password_field.error_text = "請輸入密碼"
    elif len(password_field.value) < 8:
        password_field.error_text = "密碼長度必須至少為8個字符"
    elif not any(c.isupper() for c in password_field.value):
        password_field.error_text = "密碼必須包含大寫字母"
    elif not any(c.islower() for c in password_field.value):
        password_field.error_text = "密碼必須包含小寫字母"
    elif not any(c.isdigit() for c in password_field.value):
        password_field.error_text = "密碼必須包含數字"
    else:
        password_field.error_text = None
    page.update()


def is_valid_email(email: str) -> bool:
    """Validate email format.

    Args:
        email (str): The email address to validate

    Returns:
        bool: True if the email format is valid, False otherwise
    """
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))
