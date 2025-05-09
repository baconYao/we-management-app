import flet as ft


def settings_page() -> ft.Container:
    """Create and return the settings page component."""
    # Create settings sections
    general_settings = ft.Card(
        content=ft.Container(
            content=ft.Column(
                controls=[
                    ft.Text("一般設定", size=16, weight=ft.FontWeight.BOLD),
                    ft.Divider(),
                    ft.Switch(label="深色模式", value=False),
                    ft.Switch(label="自動更新", value=True),
                    ft.Dropdown(
                        label="語言",
                        options=[
                            ft.dropdown.Option("繁體中文"),
                            ft.dropdown.Option("English"),
                        ],
                        value="繁體中文",
                        width=200,
                    ),
                ],
                spacing=10,
            ),
            padding=20,
        ),
    )

    notification_settings = ft.Card(
        content=ft.Container(
            content=ft.Column(
                controls=[
                    ft.Text("通知設定", size=16, weight=ft.FontWeight.BOLD),
                    ft.Divider(),
                    ft.Switch(label="電子郵件通知", value=True),
                    ft.Switch(label="系統通知", value=True),
                    ft.Switch(label="推播通知", value=False),
                ],
                spacing=10,
            ),
            padding=20,
        ),
    )

    security_settings = ft.Card(
        content=ft.Container(
            content=ft.Column(
                controls=[
                    ft.Text("安全設定", size=16, weight=ft.FontWeight.BOLD),
                    ft.Divider(),
                    ft.Switch(label="雙因素認證", value=False),
                    ft.Switch(label="登入通知", value=True),
                    ft.ElevatedButton(
                        "更改密碼",
                        icon=ft.icons.LOCK,
                        style=ft.ButtonStyle(
                            color=ft.colors.WHITE,
                            bgcolor=ft.colors.BLUE,
                        ),
                    ),
                ],
                spacing=10,
            ),
            padding=20,
        ),
    )

    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Text("系統設定", size=20, weight=ft.FontWeight.BOLD),
                ft.Divider(),
                ft.Row(
                    controls=[
                        ft.ElevatedButton(
                            "儲存設定",
                            icon=ft.icons.SAVE,
                            style=ft.ButtonStyle(
                                color=ft.colors.WHITE,
                                bgcolor=ft.colors.BLUE,
                            ),
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.END,
                ),
                ft.Column(
                    controls=[
                        general_settings,
                        notification_settings,
                        security_settings,
                    ],
                    spacing=20,
                ),
            ],
            spacing=20,
        ),
        padding=20,
        expand=True,
    )
