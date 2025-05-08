import flet as ft
from services.auth import auth_service
from utils.validation import validate_email, validate_password


def login_page(page: ft.Page) -> ft.Container:
    """Create and return the login page component."""
    # Form fields
    email = ft.TextField(
        label="電子郵件",
        border=ft.InputBorder.UNDERLINE,
        width=300,
        prefix_icon=ft.icons.EMAIL,
        on_change=lambda e: validate_email(e.control, page),
    )

    password = ft.TextField(
        label="密碼",
        border=ft.InputBorder.UNDERLINE,
        width=300,
        password=True,
        can_reveal_password=True,
        prefix_icon=ft.icons.LOCK,
        on_change=lambda e: validate_password(e.control, page),
    )

    def login_click(e):
        # Validate all fields
        validate_email(email, page)
        validate_password(password, page)

        if email.error_text or password.error_text:
            page.snack_bar = ft.SnackBar(content=ft.Text("請修正表單中的錯誤"))
            page.snack_bar.open = True
            page.update()
            return

        # Attempt login
        success, message = auth_service.login(email.value, password.value)

        if success:
            # Clear form
            email.value = ""
            password.value = ""

            page.go("/dashboard")
        else:
            print("error", message)
            # Show error message
            snack_bar = ft.SnackBar(
                content=ft.Text(message), bgcolor=ft.colors.RED_400, duration=3000
            )
            snack_bar.open = True
            page.overlay.append(snack_bar)
            page.update()

        page.update()

    login_button = ft.ElevatedButton(
        "登入",
        on_click=login_click,
        style=ft.ButtonStyle(
            color=ft.colors.WHITE,
            bgcolor=ft.colors.BLUE,
        ),
        width=300,
    )

    # Form container
    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Text("登入", size=30, weight=ft.FontWeight.BOLD),
                ft.Text("請登入以繼續", size=16, color=ft.colors.GREY_700),
                ft.Container(height=20),  # Spacer
                email,
                ft.Container(height=10),  # Spacer
                password,
                ft.Container(height=20),  # Spacer
                login_button,
                ft.Container(height=10),  # Spacer
                ft.TextButton("忘記密碼？"),
                ft.Row(
                    controls=[ft.Text("還沒有帳號？"), ft.TextButton("註冊")],
                    alignment=ft.MainAxisAlignment.CENTER,
                ),
            ],
            spacing=10,
            alignment=ft.MainAxisAlignment.CENTER,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
        ),
        padding=20,
        border_radius=10,
        border=ft.border.all(1, ft.colors.GREY_400),
        bgcolor=ft.colors.WHITE,
    )
