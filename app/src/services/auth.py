from typing import Optional, Tuple


class AuthService:
    """Authentication service for handling user login and session management"""

    def __init__(self):
        self.current_user: Optional[dict] = None
        # In-memory user storage
        self._users = {
            "admin@example.com": {
                # In production, use hashed passwords
                "password": "Admin123",
                "name": "Admin User",
                "role": "admin",
            },
            "bacon@example.com": {
                # In production, use hashed passwords
                "password": "Bacon123",
                "name": "Bacon 堯",
                "role": "user",
            },
        }

    def login(self, email: str, password: str) -> Tuple[bool, str]:
        """
        Attempt to log in a user.

        Args:
            email: User's email address
            password: User's password

        Returns:
            Tuple of (success: bool, message: str)
        """
        if (
            email not in self._users
            or self._users[email]["password"] != password
        ):
            return False, "電子郵件帳號或密碼錯誤"

        self.current_user = {
            "email": email,
            "name": self._users[email]["name"],
            "role": self._users[email]["role"],
        }
        return True, f"歡迎回來，{self._users[email]['name']}！"

    def logout(self) -> None:
        """Log out the current user."""
        self.current_user = None

    def is_authenticated(self) -> bool:
        """Check if a user is currently logged in."""
        return self.current_user is not None

    def get_current_user(self) -> Optional[dict]:
        """Get the current user's information."""
        return self.current_user

    def register(
        self, email: str, password: str, name: str
    ) -> Tuple[bool, str]:
        """
        Register a new user.

        Args:
            email: User's email address
            password: User's password
            name: User's name

        Returns:
            Tuple of (success: bool, message: str)
        """
        if email in self._users:
            return False, "此電子郵件已被註冊"

        self._users[email] = {
            # In production, use hashed passwords
            "password": password,
            "name": name,
            "role": "user",
        }
        return True, "註冊成功！請登入。"

    def change_password(
        self, email: str, current_password: str, new_password: str
    ) -> Tuple[bool, str]:
        """
        Change user's password.

        Args:
            email: User's email address
            current_password: Current password
            new_password: New password

        Returns:
            Tuple of (success: bool, message: str)
        """
        if email not in self._users:
            return False, "找不到此用戶"

        if self._users[email]["password"] != current_password:
            return False, "目前密碼錯誤"

        self._users[email]["password"] = new_password
        return True, "密碼已更新"


# Create a singleton instance
auth_service = AuthService()
