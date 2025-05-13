import flet as ft
from services.customers import customer_service


def customers_page(page: ft.Page) -> ft.Container:
    """Create and return the customers page component."""
    # State for current page
    current_page = 1
    page_size = 10
    search_query = ""

    def update_table(page_num: int, query: str = None):
        # Get paginated data
        customers, total_pages = customer_service.get_paginated_customers(
            page=page_num, page_size=page_size, search_query=query
        )

        # Update table rows
        data_table.rows = [
            ft.DataRow(
                cells=[
                    ft.DataCell(ft.Text(customer["name"])),
                    ft.DataCell(ft.Text(customer["gender"])),
                    ft.DataCell(ft.Text(customer["phone"])),
                    ft.DataCell(ft.Text(customer["address"])),
                    ft.DataCell(ft.Text("是" if customer["is_member"] else "否")),
                    ft.DataCell(ft.Text(customer["email"])),
                    ft.DataCell(ft.Text(customer["line_id"])),
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
            )
            for customer in customers
        ]

        # Update page info
        page_info.value = f"第 {page_num} 頁，共 {total_pages} 頁"

        # Update pagination buttons
        prev_button.disabled = page_num <= 1
        next_button.disabled = page_num >= total_pages

        # Update page input
        page_input.value = str(page_num)
        page_input.error_text = None

        page.update()

    def prev_page(e):
        nonlocal current_page
        if current_page > 1:
            current_page -= 1
            update_table(current_page, search_query)

    def next_page(e):
        nonlocal current_page
        _, total_pages = customer_service.get_paginated_customers(
            page=current_page, page_size=page_size, search_query=search_query
        )
        if current_page < total_pages:
            current_page += 1
            update_table(current_page, search_query)

    def on_page_input(e):
        nonlocal current_page
        try:
            new_page = int(e.control.value)
            _, total_pages = customer_service.get_paginated_customers(
                page=1, page_size=page_size, search_query=search_query
            )
            if 1 <= new_page <= total_pages:
                current_page = new_page
                update_table(current_page, search_query)
            else:
                e.control.error_text = f"請輸入 1 到 {total_pages} 之間的數字"
                page.update()
        except ValueError:
            e.control.error_text = "請輸入有效的數字"
            page.update()

    def on_search(e):
        nonlocal current_page, search_query
        search_query = e.control.value
        current_page = 1  # Reset to first page when searching
        update_table(current_page, search_query)

    # Create a data table
    data_table = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("姓名", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("性別", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("電話", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("住址", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("是否為會員", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("電子信箱", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("Line ID", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("操作", weight=ft.FontWeight.BOLD)),
        ],
        rows=[],
    )

    # Pagination controls
    page_info = ft.Text("")
    prev_button = ft.IconButton(
        icon=ft.icons.ARROW_BACK,
        on_click=prev_page,
    )
    next_button = ft.IconButton(
        icon=ft.icons.ARROW_FORWARD,
        on_click=next_page,
    )
    page_input = ft.TextField(
        width=40,
        height=30,
        text_align=ft.TextAlign.CENTER,
        on_submit=on_page_input,
        border_radius=4,
        text_size=12,
        content_padding=ft.padding.only(left=8, right=8, top=0, bottom=0),
    )

    # Initialize the table with first page
    update_table(current_page)

    return ft.Container(
        content=ft.Column(
            controls=[
                ft.Row(
                    controls=[
                        ft.Text("客戶管理", size=20, weight=ft.FontWeight.BOLD),
                        ft.Row(
                            controls=[
                                ft.TextField(
                                    hint_text="搜尋客戶...",
                                    width=200,
                                    height=40,
                                    border_radius=8,
                                    prefix_icon=ft.icons.SEARCH,
                                    on_change=on_search,
                                ),
                                ft.ElevatedButton(
                                    "新增客戶",
                                    icon=ft.icons.ADD,
                                    style=ft.ButtonStyle(
                                        color=ft.colors.WHITE,
                                        bgcolor=ft.colors.BLUE,
                                    ),
                                ),
                            ],
                            spacing=10,
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                ),
                ft.Divider(),
                ft.Container(
                    content=data_table,
                    expand=True,
                    width=1200,
                ),
                ft.Row(
                    controls=[
                        prev_button,
                        page_info,
                        page_input,
                        next_button,
                    ],
                    alignment=ft.MainAxisAlignment.CENTER,
                    spacing=10,
                ),
            ],
            spacing=20,
            expand=True,
            horizontal_alignment=ft.CrossAxisAlignment.START,
        ),
        padding=20,
        expand=True,
    )
