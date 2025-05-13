import random
from typing import Dict, List, Tuple


class CustomerService:
    """Service for managing customer data."""

    def __init__(self):
        # Mock data for customers
        self._customers = [
            {
                "id": i,
                "name": (
                    f"{random.choice(['王', '李', '張', '劉', '陳', '楊', '黃'])}"
                    f"{random.choice(['小', '大', '志', '明', '俊', '文', '建'])}"
                    f"{random.choice(['明', '華', '強', '玲', '美', '麗', '娟'])}"
                ),
                "gender": random.choice(["男", "女"]),
                "phone": f"09{random.randint(10000000, 99999999)}",
                "address": (
                    f"{random.choice(['台北市', '新北市', '桃園市', '新竹市', '台中市'])}"
                    f"{random.choice(['中正區', '信義區', '大安區', '中山區', '板橋區'])}"
                    f"{random.choice(['中正路', '信義路', '中山路', '民生路', '和平路'])}"
                    f"{random.randint(1, 999)}號"
                ),
                "member_id": (
                    f"M{random.randint(1000, 9999)}"
                    if random.random() > 0.5
                    else ""
                ),
                "email": f"user{i}@example.com",
                "line_id": f"line{i}",
            }
            for i in range(1, 34)  # Generate 33 records
        ]

    def search_customers(self, query: str) -> List[Dict]:
        """
        Search customers by name, phone, email, or line_id.

        Args:
            query: Search query string

        Returns:
            List of matching customers
        """
        if not query:
            return self._customers

        query = query.lower()
        return [
            customer
            for customer in self._customers
            if (
                query in customer["name"].lower()
                or query in customer["phone"]
                or query in customer["email"].lower()
                or query in customer["line_id"].lower()
            )
        ]

    def get_paginated_customers(
        self, page: int = 1, page_size: int = 25, search_query: str = None
    ) -> Tuple[List[Dict], int]:
        """
        Get paginated customers.

        Args:
            page: Page number (1-based)
            page_size: Number of records per page
            search_query: Optional search query to filter customers

        Returns:
            Tuple of (customers for current page, total number of pages)
        """
        # Get filtered customers if search query is provided
        customers = (
            self.search_customers(search_query)
            if search_query
            else self._customers
        )

        # Calculate pagination
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        total_pages = (len(customers) + page_size - 1) // page_size

        return customers[start_idx:end_idx], total_pages

    def get_all_customers(self) -> List[Dict]:
        """Get all customers."""
        return self._customers

    def get_customer(self, customer_id: int) -> Dict:
        """Get a specific customer by ID."""
        for customer in self._customers:
            if customer["id"] == customer_id:
                return customer
        return None

    def add_customer(self, customer_data: Dict) -> Dict:
        """Add a new customer."""
        customer_id = max(c["id"] for c in self._customers) + 1
        customer = {"id": customer_id, **customer_data}
        self._customers.append(customer)
        return customer

    def update_customer(self, customer_id: int, customer_data: Dict) -> Dict:
        """Update an existing customer."""
        for i, customer in enumerate(self._customers):
            if customer["id"] == customer_id:
                self._customers[i] = {**customer, **customer_data}
                return self._customers[i]
        return None

    def delete_customer(self, customer_id: int) -> bool:
        """Delete a customer."""
        for i, customer in enumerate(self._customers):
            if customer["id"] == customer_id:
                del self._customers[i]
                return True
        return False


# Create a singleton instance
customer_service = CustomerService()
