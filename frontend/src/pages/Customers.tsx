import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  Search as SearchIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import CustomerAddForm from '../components/CustomerAddForm';
import type { Customer } from '../mock/customers';
import { initialCustomers } from '../mock/customers';

export default function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (customer?: Customer) => {
    setSelectedCustomer(customer || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleSubmit = (formData: Omit<Customer, 'id' | 'uid'>) => {
    if (selectedCustomer) {
      // 更新現有客戶
      setCustomers(customers.map(customer =>
        customer.id === selectedCustomer.id
          ? { ...customer, ...formData }
          : customer
      ));
    } else {
      // 添加新客戶
      const newCustomer: Customer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        uid: `CUS${new Date().toISOString().slice(0,10).replace(/-/g,'')}${String(Math.max(...customers.map(c => c.id)) + 1).padStart(3, '0')}`,
        ...formData,
      };
      setCustomers([...customers, newCustomer]);
    }
    handleClose();
  };

  const handleViewDetails = (uid: string) => {
    navigate(`/customers/${uid}`);
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
              <TableCell>地址</TableCell>
              <TableCell>加入時間</TableCell>
              <TableCell>詳細資訊</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer.uid}>
                  <TableCell>{customer.memberId || '-'}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.joinDate || '-'}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(customer.uid)}
                      title="查看詳情"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomerAddForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={selectedCustomer || undefined}
      />
    </Layout>
  );
} 