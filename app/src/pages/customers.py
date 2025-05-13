import flet as ft
from services.customers import customer_service
from utils.validation import is_valid_email


def add_customer_dialog(page: ft.Page, on_save: callable):
    """Open a dialog to add a new customer.

    This function creates and displays a modal dialog with a form to add a new customer.
    The form includes fields for:
    - Name (required)
    - Gender (dropdown: 男/女)
    - Phone (required)
    - Address
    - Membership status (switch)
    - Email (optional, but must be valid format if provided)
    - Line ID

    The dialog includes validation for required fields and email format.
    On successful submission, the new customer is added to the service and the table is updated.

    Args:
        page: The Flet page object
        on_save: Callback function to be called after successful save
    """

    def close_dlg(e):
        page.close(dialog)

    def save_customer(e):
        # Validate required fields
        if not name_field.value:
            name_field.error_text = "請輸入姓名"
            page.update()
            return
        if not phone_field.value:
            phone_field.error_text = "請輸入電話"
            page.update()
            return

        # Validate email format if provided
        if email_field.value and not is_valid_email(email_field.value):
            email_field.error_text = "請輸入有效的電子信箱格式"
            page.update()
            return

        # Create customer data
        customer_data = {
            "name": name_field.value,
            "gender": gender_dropdown.value,
            "phone": phone_field.value,
            "address": address_field.value,
            "member_id": member_id_field.value or "",
            "email": email_field.value or "",  # Use empty string if no email provided
            "line_id": line_id_field.value or "",
        }

        # Add customer
        customer_service.add_customer(customer_data)
        close_dlg(e)
        on_save()

    # Create form fields
    name_field = ft.TextField(
        label="姓名",
        width=300,
        border_radius=8,
    )
    gender_dropdown = ft.Dropdown(
        label="性別",
        width=300,
        options=[
            ft.dropdown.Option("男"),
            ft.dropdown.Option("女"),
        ],
        border_radius=8,
    )
    phone_field = ft.TextField(
        label="電話",
        width=300,
        border_radius=8,
    )
    address_field = ft.TextField(
        label="住址",
        width=300,
        border_radius=8,
    )
    member_id_field = ft.TextField(
        label="會員編號 (選填)",
        width=300,
        border_radius=8,
    )
    email_field = ft.TextField(
        label="電子信箱 (選填)",
        width=300,
        border_radius=8,
    )
    line_id_field = ft.TextField(
        label="Line ID (選填)",
        width=300,
        border_radius=8,
    )

    # Create dialog
    dialog = ft.AlertDialog(
        modal=True,
        title=ft.Text("新增客戶"),
        content=ft.Column(
            controls=[
                name_field,
                gender_dropdown,
                phone_field,
                address_field,
                member_id_field,
                email_field,
                line_id_field,
            ],
            spacing=20,
            scroll=ft.ScrollMode.AUTO,
        ),
        actions=[
            ft.TextButton("取消", on_click=close_dlg),
            ft.TextButton("儲存", on_click=save_customer),
        ],
        actions_alignment=ft.MainAxisAlignment.END,
    )

    page.open(dialog)


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
                    ft.DataCell(ft.Text(customer["member_id"])),
                    ft.DataCell(ft.Text(customer["email"])),
                    ft.DataCell(ft.Text(customer["line_id"])),
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
        customers, total_pages = customer_service.get_paginated_customers(
            page=current_page, page_size=page_size, search_query=search_query
        )
        if current_page < total_pages:
            current_page += 1
            update_table(current_page, search_query)

    def on_page_input(e):
        nonlocal current_page
        try:
            new_page = int(e.control.value)
            customers, total_pages = customer_service.get_paginated_customers(
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

    def on_add_customer():
        update_table(current_page, search_query)

    # Create a data table
    data_table = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("姓名", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("性別", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("電話", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("住址", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("會員編號", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("電子信箱", weight=ft.FontWeight.BOLD)),
            ft.DataColumn(ft.Text("Line ID", weight=ft.FontWeight.BOLD)),
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
                                    on_click=lambda e: add_customer_dialog(
                                        page, on_add_customer
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
