import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: '張三',
    email: 'zhang.san@example.com',
    phone: '0912-345-678',
  },
  {
    id: 2,
    name: '李四',
    email: 'li.si@example.com',
    phone: '0923-456-789',
  },
  {
    id: 3,
    name: '王五',
    email: 'wang.wu@example.com',
    phone: '0934-567-890',
  },
  {
    id: 4,
    name: '陳六',
    email: 'chen.liu@example.com',
    phone: '0945-678-901',
  },
  {
    id: 5,
    name: '林七',
    email: 'lin.qi@example.com',
    phone: '0956-789-012',
  },
  {
    id: 6,
    name: '黃八',
    email: 'huang.ba@example.com',
    phone: '0967-890-123',
  },
  {
    id: 7,
    name: '趙九',
    email: 'zhao.jiu@example.com',
    phone: '0978-901-234',
  },
  {
    id: 8,
    name: '吳十',
    email: 'wu.shi@example.com',
    phone: '0989-012-345',
  },
  {
    id: 9,
    name: '周十一',
    email: 'zhou.shiyi@example.com',
    phone: '0901-234-567',
  },
  {
    id: 10,
    name: '鄭十二',
    email: 'zheng.shier@example.com',
    phone: '0912-345-678',
  },
  {
    id: 11,
    name: '孫十三',
    email: 'sun.shisan@example.com',
    phone: '0923-456-789',
  },
  {
    id: 12,
    name: '楊十四',
    email: 'yang.shisi@example.com',
    phone: '0934-567-890',
  },
  {
    id: 13,
    name: '朱十五',
    email: 'zhu.shiwu@example.com',
    phone: '0945-678-901',
  },
  {
    id: 14,
    name: '胡十六',
    email: 'hu.shiliu@example.com',
    phone: '0956-789-012',
  },
  {
    id: 15,
    name: '高十七',
    email: 'gao.shiqi@example.com',
    phone: '0967-890-123',
  },
  {
    id: 16,
    name: '林十八',
    email: 'lin.shiba@example.com',
    phone: '0978-901-234',
  },
  {
    id: 17,
    name: '何十九',
    email: 'he.shijiu@example.com',
    phone: '0989-012-345',
  },
  {
    id: 18,
    name: '郭二十',
    email: 'guo.ershi@example.com',
    phone: '0901-234-567',
  },
  {
    id: 19,
    name: '馬二一',
    email: 'ma.eryi@example.com',
    phone: '0912-345-678',
  },
  {
    id: 20,
    name: '羅二二',
    email: 'luo.erer@example.com',
    phone: '0923-456-789',
  },
  {
    id: 21,
    name: '梁二三',
    email: 'liang.ersan@example.com',
    phone: '0934-567-890',
  },
  {
    id: 22,
    name: '宋二四',
    email: 'song.ersi@example.com',
    phone: '0945-678-901',
  },
  {
    id: 23,
    name: '鄭二五',
    email: 'zheng.erwu@example.com',
    phone: '0956-789-012',
  },
  {
    id: 24,
    name: '謝二六',
    email: 'xie.erliu@example.com',
    phone: '0967-890-123',
  },
  {
    id: 25,
    name: '韓二七',
    email: 'han.erqi@example.com',
    phone: '0978-901-234',
  },
  {
    id: 26,
    name: '唐二八',
    email: 'tang.erba@example.com',
    phone: '0989-012-345',
  },
  {
    id: 27,
    name: '馮二九',
    email: 'feng.erjiu@example.com',
    phone: '0901-234-567',
  },
  {
    id: 28,
    name: '于三十',
    email: 'yu.sanshi@example.com',
    phone: '0912-345-678',
  },
  {
    id: 29,
    name: '董三一',
    email: 'dong.sanyi@example.com',
    phone: '0923-456-789',
  },
  {
    id: 30,
    name: '蕭三二',
    email: 'xiao.saner@example.com',
    phone: '0934-567-890',
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (customer?: Customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });
    } else {
      setSelectedCustomer(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleSubmit = () => {
    if (selectedCustomer) {
      // 更新現有客戶
      setCustomers(customers.map(customer =>
        customer.id === selectedCustomer.id
          ? { ...customer, ...formData }
          : customer
      ));
    } else {
      // 添加新客戶
      const newCustomer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        ...formData,
      };
      setCustomers([...customers, newCustomer]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  // 過濾和搜尋客戶
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <Layout title="客戶管理">
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          <TextField
            fullWidth
            placeholder="搜尋客戶..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            sx={{ minWidth: '120px' }}
          >
            新增客戶
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => setPage(0)}
              disabled={page === 0}
              size="small"
            >
              <FirstPageIcon />
            </IconButton>
            <IconButton
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={page + 1}
              onChange={(e) => {
                const newPage = Math.max(0, Math.min(Math.floor(Number(e.target.value)) - 1, Math.ceil(filteredCustomers.length / rowsPerPage) - 1));
                setPage(newPage);
              }}
              InputProps={{
                inputProps: { 
                  min: 1, 
                  max: Math.ceil(filteredCustomers.length / rowsPerPage),
                  style: { textAlign: 'center', width: '60px' }
                }
              }}
            />
            <IconButton
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(filteredCustomers.length / rowsPerPage) - 1}
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
            <IconButton
              onClick={() => setPage(Math.ceil(filteredCustomers.length / rowsPerPage) - 1)}
              disabled={page >= Math.ceil(filteredCustomers.length / rowsPerPage) - 1}
              size="small"
            >
              <LastPageIcon />
            </IconButton>
          </Box>

          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel>每頁顯示</InputLabel>
            <Select
              value={rowsPerPage}
              label="每頁顯示"
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(0);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>電子郵件</TableCell>
              <TableCell>電話</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(customer)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(customer.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedCustomer ? '編輯客戶' : '新增客戶'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="姓名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="電子郵件"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="電話"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 