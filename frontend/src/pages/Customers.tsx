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
import type { Customer } from '../mock/customers';
import { initialCustomers } from '../mock/customers';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
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
        phone: customer.phone,
      });
    } else {
      setSelectedCustomer(null);
      setFormData({
        name: '',
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
        memberId: null, // 新客戶預設沒有會員編號
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
    (customer.memberId?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
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
              <TableCell>會員編號</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>電話</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.memberId || '-'}</TableCell>
                  <TableCell>{customer.name}</TableCell>
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