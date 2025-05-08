import flet as ft
from pages.dashboard import dashboard_page
from pages.login import login_page
from services.auth import auth_service


def handle_route(page: ft.Page) -> None:
    """Handle page routing."""

    def route_change(e):
        page.views.clear()

        if page.route == "/dashboard" and auth_service.is_authenticated():
            page.views.append(
                ft.View(
                    "/dashboard",
                    [
                        ft.SafeArea(
                            dashboard_page(page),
                            expand=True,
                        )
                    ],
                )
            )
        else:
            page.views.append(
                ft.View(
                    "/",
                    [
                        ft.SafeArea(
                            login_page(page),
                            expand=True,
                        )
                    ],
                )
            )
        page.update()

    def view_pop(e):
        page.views.pop()
        top_view = page.views[-1]
        page.go(top_view.route)

    page.on_route_change = route_change
    page.on_view_pop = view_pop
    page.go(page.route)
