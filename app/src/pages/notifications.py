import flet as ft


def notifications_page() -> ft.Container:
    """Create and return the notifications page component."""
    # Create a list of notifications
    notifications_list = ft.ListView(
        spacing=10,
        padding=20,
        expand=True,
        controls=[
            ft.Card(
                content=ft.Container(
                    content=ft.Column(
                        controls=[
                            ft.ListTile(
                                leading=ft.Icon(ft.icons.NOTIFICATIONS),
                                title=ft.Text("系統維護通知"),
                                subtitle=ft.Text("2024-03-20 10:00"),
                            ),
                            ft.Text(
                                "系統將於2024年3月25日進行例行維護，維護時間為2小時。"
                            ),
                            ft.Row(
                                controls=[
                                    ft.TextButton("編輯"),
                                    ft.TextButton("刪除"),
                                ],
                                alignment=ft.MainAxisAlignment.END,
                            ),
                        ],
                    ),
                    padding=10,
                ),
            ),
            # Add more notification cards as needed
        ],
    )

    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Text("通知管理", size=20, weight=ft.FontWeight.BOLD),
                ft.Divider(),
                ft.Row(
                    controls=[
                        ft.ElevatedButton(
                            "新增通知",
                            icon=ft.icons.ADD,
                            style=ft.ButtonStyle(
                                color=ft.colors.WHITE,
                                bgcolor=ft.colors.BLUE,
                            ),
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.END,
                ),
                notifications_list,
            ],
            spacing=20,
        ),
        padding=20,
        expand=True,
    )
