import flet as ft
from constants import APP_NAME
from services.auth import auth_service

from .customers import customers_page
from .notifications import notifications_page
from .profile import profile_page
from .settings import settings_page


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

    def change_route(e):
        # Update the content based on the selected index
        if e.control.selected_index == 0:
            main_content.content = customers_page()
        elif e.control.selected_index == 1:
            main_content.content = notifications_page()
        elif e.control.selected_index == 2:
            main_content.content = settings_page()
        elif e.control.selected_index == 3:
            main_content.content = profile_page()
        page.update()

    # Set up AppBar
    page.appbar = ft.AppBar(
        title=ft.Text(
            APP_NAME,
            size=24,
            weight=ft.FontWeight.BOLD,
            text_align="start",
        ),
        center_title=False,
        toolbar_height=75,
        bgcolor=ft.colors.SURFACE_VARIANT,
        actions=[
            ft.Container(
                content=ft.ElevatedButton(
                    "登出",
                    on_click=logout_click,
                    style=ft.ButtonStyle(
                        color=ft.colors.WHITE,
                        bgcolor=ft.colors.RED,
                    ),
                ),
                margin=ft.margin.only(right=25),
            )
        ],
    )
    page.update()

    # Navigation rail
    rail = ft.NavigationRail(
        selected_index=0,
        label_type=ft.NavigationRailLabelType.ALL,
        min_width=100,
        min_extended_width=200,
        group_alignment=-0.9,
        destinations=[
            ft.NavigationRailDestination(
                icon=ft.icons.PEOPLE_OUTLINE,
                selected_icon=ft.icons.PEOPLE,
                label="客戶管理",
            ),
            ft.NavigationRailDestination(
                icon=ft.icons.NOTIFICATIONS_OUTLINED,
                selected_icon=ft.icons.NOTIFICATIONS,
                label="通知管理",
            ),
            ft.NavigationRailDestination(
                icon=ft.icons.SETTINGS_OUTLINED,
                selected_icon=ft.icons.SETTINGS,
                label="系統設定",
            ),
            ft.NavigationRailDestination(
                icon=ft.icons.PERSON_OUTLINE,
                selected_icon=ft.icons.PERSON,
                label="個人資料",
            ),
        ],
        on_change=change_route,
        bgcolor=ft.colors.SURFACE_VARIANT,
    )

    # Main content container
    main_content = ft.Container(
        content=customers_page(),  # Start with customers page
        expand=True,
    )

    # Main layout
    return ft.Container(
        content=ft.Row(
            controls=[
                rail,
                ft.VerticalDivider(width=1),
                main_content,
            ],
            expand=True,
        ),
        expand=True,
    )
