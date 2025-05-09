import flet as ft


def customers_page() -> ft.Container:
    """Create and return the customers page component."""
    # Create a data table
    data_table = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("姓名")),
            ft.DataColumn(ft.Text("電子郵件")),
            ft.DataColumn(ft.Text("電話")),
            ft.DataColumn(ft.Text("操作")),
        ],
        rows=[
            ft.DataRow(
                cells=[
                    ft.DataCell(ft.Text("John Doe")),
                    ft.DataCell(ft.Text("john@example.com")),
                    ft.DataCell(ft.Text("0912345678")),
                    ft.DataCell(
                        ft.Row(
                            controls=[
                                ft.IconButton(
                                    icon=ft.icons.EDIT,
                                    icon_color=ft.colors.BLUE,
                                    tooltip="編輯",
                                ),
                                ft.IconButton(
                                    icon=ft.icons.DELETE,
                                    icon_color=ft.colors.RED,
                                    tooltip="刪除",
                                ),
                            ],
                        )
                    ),
                ]
            ),
            # Add more rows as needed
        ],
    )

    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Text("客戶管理", size=20, weight=ft.FontWeight.BOLD),
                ft.Divider(),
                ft.Row(
                    controls=[
                        ft.ElevatedButton(
                            "新增客戶",
                            icon=ft.icons.ADD,
                            style=ft.ButtonStyle(
                                color=ft.colors.WHITE,
                                bgcolor=ft.colors.BLUE,
                            ),
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.END,
                ),
                data_table,
            ],
            spacing=20,
        ),
        padding=20,
        expand=True,
    )
