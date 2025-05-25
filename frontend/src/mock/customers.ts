export interface Customer {
  id: number;
  memberId: string | null;
  name: string;
  phone: string;
}

export const initialCustomers: Customer[] = [
  {
    id: 1,
    memberId: "M001",
    name: "張三",
    phone: "0912-345-678",
  },
  {
    id: 2,
    memberId: null,
    name: "李四",
    phone: "0923-456-789",
  },
  {
    id: 3,
    memberId: "M003",
    name: "王五",
    phone: "0934-567-890",
  },
  {
    id: 4,
    memberId: null,
    name: "陳六",
    phone: "0945-678-901",
  },
  {
    id: 5,
    memberId: "M005",
    name: "林七",
    phone: "0956-789-012",
  },
  {
    id: 6,
    memberId: null,
    name: "黃八",
    phone: "0967-890-123",
  },
  {
    id: 7,
    memberId: "M007",
    name: "趙九",
    phone: "0978-901-234",
  },
  {
    id: 8,
    memberId: null,
    name: "吳十",
    phone: "0989-012-345",
  },
  {
    id: 9,
    memberId: "M009",
    name: "周十一",
    phone: "0901-234-567",
  },
  {
    id: 10,
    memberId: null,
    name: "鄭十二",
    phone: "0912-345-678",
  },
];
