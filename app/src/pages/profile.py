import flet as ft
from services.auth import auth_service


def profile_page() -> ft.Container:
    """Create and return the user profile page component."""
    current_user = auth_service.get_current_user()

    # User info section
    user_info = ft.Card(
        content=ft.Container(
            content=ft.Column(
                controls=[
                    ft.Text("個人資料", size=20, weight=ft.FontWeight.BOLD),
                    ft.Divider(),
                    ft.Row(
                        controls=[
                            ft.Icon(ft.icons.PERSON, size=40),
                            ft.Column(
                                controls=[
                                    ft.Text(
                                        current_user["name"],
                                        size=16,
                                        weight=ft.FontWeight.BOLD,
                                    ),
                                    ft.Text(
                                        current_user["email"],
                                        size=14,
                                        color=ft.colors.GREY_700,
                                    ),
                                    ft.Text(
                                        f"角色：{current_user['role']}",
                                        size=14,
                                        color=ft.colors.GREY_700,
                                    ),
                                ],
                                spacing=5,
                            ),
                        ],
                        alignment=ft.MainAxisAlignment.START,
                    ),
                ],
                spacing=20,
            ),
            padding=20,
        ),
    )

    # Password change section
    password_change = ft.Card(
        content=ft.Container(
            content=ft.Column(
                controls=[
                    ft.Text("更改密碼", size=20, weight=ft.FontWeight.BOLD),
                    ft.Divider(),
                    ft.TextField(
                        label="目前密碼",
                        password=True,
                        can_reveal_password=True,
                        width=300,
                    ),
                    ft.TextField(
                        label="新密碼",
                        password=True,
                        can_reveal_password=True,
                        width=300,
                    ),
                    ft.TextField(
                        label="確認新密碼",
                        password=True,
                        can_reveal_password=True,
                        width=300,
                    ),
                    ft.ElevatedButton(
                        "更新密碼",
                        icon=ft.icons.LOCK,
                        style=ft.ButtonStyle(
                            color=ft.colors.WHITE,
                            bgcolor=ft.colors.BLUE,
                        ),
                    ),
                ],
                spacing=20,
            ),
            padding=20,
        ),
    )

    return ft.Container(
        content=ft.Column(
            controls=[
                user_info,
                password_change,
            ],
            spacing=20,
        ),
        padding=20,
        expand=True,
    )
