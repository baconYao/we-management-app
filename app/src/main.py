import flet as ft
from routes import handle_route


def main(page: ft.Page):
    page.title = "登入"
    page.theme_mode = ft.ThemeMode.LIGHT
    page.padding = 20
    page.window_width = 400
    page.window_height = 550
    page.window_resizable = False
    page.vertical_alignment = ft.MainAxisAlignment.CENTER
    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    # Initialize routing
    handle_route(page)


ft.app(main)
