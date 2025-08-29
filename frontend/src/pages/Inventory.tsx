import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material';
import { InventoryItem } from '../models/Inventory';
import { inventoryService } from '../services/inventory';
import Layout from '../components/Layout';

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuantity, setEditingQuantity] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAllInventory();
      setInventory(data);
    } catch (error) {
      showSnackbar('載入庫存資料失敗', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuantity = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditingQuantity(item.stockQuantity);
  };

  const handleSaveQuantity = async (id: string) => {
    try {
      if (editingQuantity < 0) {
        showSnackbar('庫存數量不能為負數', 'error');
        return;
      }

      await inventoryService.updateStockQuantity({
        id,
        stockQuantity: editingQuantity
      });

      // 更新本地狀態
      setInventory(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, stockQuantity: editingQuantity }
            : item
        )
      );

      setEditingId(null);
      showSnackbar('庫存數量更新成功', 'success');
    } catch (error) {
      showSnackbar('更新庫存數量失敗', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingQuantity(0);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Layout title="庫存管理">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="庫存管理">
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    名稱
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    品項
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    規格
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    價格
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    庫存數量
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    操作
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.itemCode}</TableCell>
                    <TableCell>{item.specification}</TableCell>
                    <TableCell>NT$ {item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <TextField
                          type="number"
                          value={editingQuantity}
                          onChange={(e) => setEditingQuantity(Number(e.target.value))}
                          size="small"
                          sx={{ width: 100 }}
                          inputProps={{ min: 0 }}
                        />
                      ) : (
                        item.stockQuantity
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <Box>
                          <Tooltip title="儲存">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleSaveQuantity(item.id)}
                            >
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="取消">
                            <IconButton
                              color="default"
                              size="small"
                              onClick={handleCancelEdit}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Tooltip title="編輯庫存數量">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEditQuantity(item)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default Inventory;
