import flet as ft
from constants import (
    APP_NAME,
    THEME_MODE,
    WINDOW_HEIGHT,
    WINDOW_MIN_HEIGHT,
    WINDOW_MIN_WIDTH,
    WINDOW_WIDTH,
)
from routes import handle_route


def main(page: ft.Page):
    page.title = APP_NAME
    # Set theme mode based on configuration
    is_dark_mode = THEME_MODE == "dark"
    page.theme_mode = ft.ThemeMode.DARK if is_dark_mode else ft.ThemeMode.LIGHT
    page.padding = 0  # Remove padding to allow full-width content
    page.window_width = WINDOW_WIDTH
    page.window_height = WINDOW_HEIGHT
    page.window_min_width = WINDOW_MIN_WIDTH
    page.window_min_height = WINDOW_MIN_HEIGHT
    page.window_resizable = True
    page.vertical_alignment = ft.MainAxisAlignment.CENTER
    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    # Initialize routing
    handle_route(page)


ft.app(main)
