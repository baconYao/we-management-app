import flet as ft
from services.auth import auth_service


def dashboard_page(page: ft.Page) -> ft.Container:
    """Create and return the dashboard page component."""
    current_user = auth_service.get_current_user()

    if not current_user:
        return ft.Container(
            content=ft.Text("請先登入", size=20), alignment=ft.alignment.center
        )

    def logout_click(e):
        auth_service.logout()
        page.go("/")

    # Dashboard content
    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Row(
                    controls=[
                        ft.Text(
                            f"歡迎，{current_user['name']}！",
                            size=30,
                            weight=ft.FontWeight.BOLD,
                        ),
                        ft.ElevatedButton(
                            "登出",
                            on_click=logout_click,
                            style=ft.ButtonStyle(
                                color=ft.colors.WHITE,
                                bgcolor=ft.colors.RED,
                            ),
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                ),
                ft.Divider(),
                ft.Text(
                    f"電子郵件：{current_user['email']}",
                    size=16,
                ),
                ft.Text(
                    f"角色：{current_user['role']}",
                    size=16,
                ),
            ],
            spacing=20,
        ),
        padding=20,
        border_radius=10,
        border=ft.border.all(1, ft.colors.GREY_400),
        bgcolor=ft.colors.WHITE,
    )
