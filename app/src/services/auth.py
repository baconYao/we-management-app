import json
from pathlib import Path
from typing import Optional, Tuple


class AuthService:
    """Authentication service for handling user login and session management."""

    def __init__(self):
        self.users_file = Path("app/data/users.json")
        self._ensure_users_file()
        self.current_user: Optional[dict] = None

    def _ensure_users_file(self) -> None:
        """Ensure the users data file exists."""
        self.users_file.parent.mkdir(parents=True, exist_ok=True)
        if not self.users_file.exists():
            # Create default users
            default_users = {
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
            with open(self.users_file, "w", encoding="utf-8") as f:
                json.dump(default_users, f, indent=4)

    def _load_users(self) -> dict:
        """Load users from the JSON file."""
        with open(self.users_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def _save_users(self, users: dict) -> None:
        """Save users to the JSON file."""
        with open(self.users_file, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=4)

    def login(self, email: str, password: str) -> Tuple[bool, str]:
        """
        Attempt to log in a user.

        Args:
            email: User's email address
            password: User's password

        Returns:
            Tuple of (success: bool, message: str)
        """
        users = self._load_users()

        if email not in users or users[email]["password"] != password:
            return False, "電子郵件帳號或密碼錯誤"

        self.current_user = {
            "email": email,
            "name": users[email]["name"],
            "role": users[email]["role"],
        }
        return True, f"歡迎回來，{users[email]['name']}！"

    def logout(self) -> None:
        """Log out the current user."""
        self.current_user = None

    def is_authenticated(self) -> bool:
        """Check if a user is currently logged in."""
        return self.current_user is not None

    def get_current_user(self) -> Optional[dict]:
        """Get the current user's information."""
        return self.current_user

    def register(self, email: str, password: str, name: str) -> Tuple[bool, str]:
        """
        Register a new user.

        Args:
            email: User's email address
            password: User's password
            name: User's name

        Returns:
            Tuple of (success: bool, message: str)
        """
        users = self._load_users()

        if email in users:
            return False, "此電子郵件已被註冊"

        users[email] = {
            # In production, use hashed passwords
            "password": password,
            "name": name,
            "role": "user",
        }

        self._save_users(users)
        return True, "註冊成功！請登入。"


# Create a singleton instance
auth_service = AuthService()
