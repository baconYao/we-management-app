export interface MaintenanceRecord {
  date: string;
  items: string[];
  notes?: string;
}

export interface WaterPurifier {
  model: string;
  serialNumber: string;
  installationDate: string;
  location: string;
  maintenanceRecords?: MaintenanceRecord[];
}

export interface Customer {
  id: number;
  uid: string;
  memberId: string | null;
  name: string;
  gender: "male" | "female" | "other";
  birthDate: string; // YYYY-MM-DD
  address: string;
  phone: string;
  email?: string;
  socialMedia?: {
    line?: string;
    facebook?: string;
    wechat?: string;
    whatsapp?: string;
  };
  joinDate?: string; // YYYY-MM-DD
  waterPurifiers?: WaterPurifier[];
}

export const initialCustomers: Customer[] = [
  {
    id: 1,
    uid: "CUS20240301001",
    memberId: "M001",
    name: "張三",
    gender: "male",
    birthDate: "1985-06-15",
    address: "台北市信義區信義路五段7號",
    phone: "0912-345-678",
    email: "zhang.san@example.com",
    socialMedia: {
      line: "zhangsan123",
      facebook: "zhang.san",
    },
    joinDate: "2023-01-15",
    waterPurifiers: [
      {
        model: "廚下型",
        serialNumber: "WP2024001",
        installationDate: "2024-01-15",
        location: "廚房",
        maintenanceRecords: [
          {
            date: "2024-03-15",
            items: ["前置濾心", "RO膜", "後置濾心"],
            notes: "定期更換",
          },
          {
            date: "2024-02-15",
            items: ["前置濾心", "RO膜"],
            notes: "定期更換",
          },
          {
            date: "2024-01-15",
            items: ["前置濾心", "RO膜", "後置濾心", "活性碳濾心"],
            notes: "新機安裝",
          },
        ],
      },
      {
        model: "桌上型",
        serialNumber: "WP2024002",
        installationDate: "2024-02-01",
        location: "客廳",
        maintenanceRecords: [
          {
            date: "2024-02-01",
            items: ["前置濾心", "RO膜", "後置濾心", "活性碳濾心"],
            notes: "新機安裝",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    uid: "CUS20240301002",
    memberId: null,
    name: "李四",
    gender: "female",
    birthDate: "1990-03-22",
    address: "台北市大安區敦化南路二段333號",
    phone: "0923-456-789",
    email: "li.si@example.com",
    socialMedia: {
      wechat: "lisi456",
    },
    waterPurifiers: [
      {
        model: "廚下型",
        serialNumber: "WP2024003",
        installationDate: "2024-01-20",
        location: "廚房",
        maintenanceRecords: [
          {
            date: "2024-03-10",
            items: ["前置濾心", "RO膜", "後置濾心"],
            notes: "定期更換",
          },
          {
            date: "2024-02-10",
            items: ["前置濾心", "後置濾心"],
            notes: "水質異常更換",
          },
          {
            date: "2024-01-20",
            items: ["前置濾心", "RO膜", "後置濾心", "活性碳濾心"],
            notes: "新機安裝",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    uid: "CUS20240301003",
    memberId: "M003",
    name: "王五",
    gender: "male",
    birthDate: "1988-11-30",
    address: "台北市中山區南京東路三段219號",
    phone: "0934-567-890",
    socialMedia: {
      line: "wangwu789",
      whatsapp: "+886934567890",
    },
    joinDate: "2023-06-20",
    waterPurifiers: [
      {
        model: "廚下型",
        serialNumber: "WP2024004",
        installationDate: "2024-02-15",
        location: "廚房",
        maintenanceRecords: [
          {
            date: "2024-02-15",
            items: ["前置濾心", "RO膜", "後置濾心", "活性碳濾心"],
            notes: "新機安裝",
          },
        ],
      },
      {
        model: "直立型",
        serialNumber: "WP2024005",
        installationDate: "2024-02-20",
        location: "書房",
        maintenanceRecords: [
          {
            date: "2024-02-20",
            items: ["前置濾心", "RO膜", "後置濾心", "活性碳濾心"],
            notes: "新機安裝",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    uid: "CUS20240301004",
    memberId: null,
    name: "陳六",
    gender: "female",
    birthDate: "1992-08-08",
    address: "台北市松山區民生東路三段156號",
    phone: "0945-678-901",
    email: "chen.liu@example.com",
  },
  {
    id: 5,
    uid: "CUS20240301005",
    memberId: "M005",
    name: "林七",
    gender: "male",
    birthDate: "1987-04-12",
    address: "台北市內湖區瑞光路188號",
    phone: "0956-789-012",
    socialMedia: {
      facebook: "lin.qi",
      wechat: "linqi123",
    },
    joinDate: "2023-09-05",
  },
  {
    id: 6,
    uid: "CUS20240301006",
    memberId: null,
    name: "黃八",
    gender: "female",
    birthDate: "1995-12-25",
    address: "台北市南港區南港路三段48號",
    phone: "0967-890-123",
    email: "huang.ba@example.com",
    socialMedia: {
      line: "huangba456",
      whatsapp: "+886967890123",
    },
  },
  {
    id: 7,
    uid: "CUS20240301007",
    memberId: "M007",
    name: "趙九",
    gender: "male",
    birthDate: "1983-07-18",
    address: "台北市文山區木柵路三段77號",
    phone: "0978-901-234",
    socialMedia: {
      facebook: "zhao.jiu",
      wechat: "zhaojiu789",
    },
    joinDate: "2023-03-10",
  },
  {
    id: 8,
    uid: "CUS20240301008",
    memberId: null,
    name: "吳十",
    gender: "female",
    birthDate: "1991-09-30",
    address: "台北市士林區中正路420號",
    phone: "0989-012-345",
    email: "wu.shi@example.com",
  },
  {
    id: 9,
    uid: "CUS20240301009",
    memberId: "M009",
    name: "周十一",
    gender: "male",
    birthDate: "1986-02-14",
    address: "台北市北投區石牌路二段201號",
    phone: "0901-234-567",
    socialMedia: {
      line: "zhoushiyi123",
      whatsapp: "+886901234567",
    },
    joinDate: "2023-11-15",
  },
  {
    id: 10,
    uid: "CUS20240301010",
    memberId: null,
    name: "鄭十二",
    gender: "female",
    birthDate: "1993-05-20",
    address: "台北市萬華區西寧南路36號",
    phone: "0912-345-678",
    email: "zheng.shier@example.com",
    socialMedia: {
      facebook: "zheng.shier",
      wechat: "zhengshier456",
    },
  },
];
