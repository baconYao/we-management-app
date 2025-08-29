import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Layout from '../components/Layout';
import PurifierAddForm from '../components/PurifierAddForm';
import type { Customer, WaterPurifier, MaintenanceRecord } from '../mock/customers';
import { initialCustomers } from '../mock/customers';

export default function CustomerDetail() {
  const { uid } = useParams<{ uid: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [selectedPurifier, setSelectedPurifier] = useState<WaterPurifier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddPurifierDialogOpen, setIsAddPurifierDialogOpen] = useState(false);

  useEffect(() => {
    // 在實際應用中，這裡會是 API 調用
    const foundCustomer = initialCustomers.find(c => c.uid === uid);
    setCustomer(foundCustomer || null);
  }, [uid]);

  const handleOpenDialog = (purifier: WaterPurifier) => {
    setSelectedPurifier(purifier);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPurifier(null);
  };

  const handleOpenAddPurifier = () => {
    setIsAddPurifierDialogOpen(true);
  };

  const handleCloseAddPurifier = () => {
    setIsAddPurifierDialogOpen(false);
  };

  const handleAddPurifier = (purifier: Omit<WaterPurifier, 'maintenanceRecords'>) => {
    // 這裡會實作新增淨水器的邏輯
    console.log('新增淨水器:', purifier);
    // 目前只是關閉對話框
    handleCloseAddPurifier();
  };

  if (!customer) {
    return (
      <Layout title="客戶詳細資訊">
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" color="error">
            找不到客戶資訊
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="客戶詳細資訊">
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* 基本資訊區塊 */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
              基本資訊
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {/* 左側資訊 */}
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      會員編號
                    </Typography>
                    <Typography variant="body1">
                      {customer.memberId || '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      姓名
                    </Typography>
                    <Typography variant="body1">
                      {customer.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      性別
                    </Typography>
                    <Typography variant="body1">
                      {customer.gender === 'male' ? '男' : customer.gender === 'female' ? '女' : '其他'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      生日
                    </Typography>
                    <Typography variant="body1">
                      {customer.birthDate}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      加入時間
                    </Typography>
                    <Typography variant="body1">
                      {customer.joinDate || '-'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* 右側資訊 */}
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      電話
                    </Typography>
                    <Typography variant="body1">
                      {customer.phone}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      電子信箱
                    </Typography>
                    <Typography variant="body1">
                      {customer.email || '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      地址
                    </Typography>
                    <Typography variant="body1">
                      {customer.address}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      通訊軟體
                    </Typography>
                    {customer.socialMedia ? (
                      <List dense>
                        {customer.socialMedia.line && (
                          <ListItem>
                            <ListItemText primary={`Line: ${customer.socialMedia.line}`} />
                          </ListItem>
                        )}
                        {customer.socialMedia.wechat && (
                          <ListItem>
                            <ListItemText primary={`WeChat: ${customer.socialMedia.wechat}`} />
                          </ListItem>
                        )}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        無通訊軟體資訊
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>

          {/* 淨水器資訊區塊 */}
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                淨水器資訊
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddPurifier}
                sx={{ minWidth: '120px' }}
              >
                新增淨水器
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>水機號碼</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>型號</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>裝機時間</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>裝機人員</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>擺放位置</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>耗材更換紀錄</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.waterPurifiers && customer.waterPurifiers.length > 0 ? (
                    customer.waterPurifiers.map((purifier: WaterPurifier, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{purifier.serialNumber}</TableCell>
                        <TableCell>{purifier.model}</TableCell>
                        <TableCell>{purifier.installationDate}</TableCell>
                        <TableCell>{purifier.installationPerson}</TableCell>
                        <TableCell>{purifier.location}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenDialog(purifier)}
                          >
                            查看紀錄
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1" color="text.secondary">
                          尚無淨水器資訊
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>

        {/* 耗材更換紀錄對話框 */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            耗材更換紀錄 - {selectedPurifier?.model} ({selectedPurifier?.serialNumber})
          </DialogTitle>
          <DialogContent>
            {selectedPurifier?.maintenanceRecords && selectedPurifier.maintenanceRecords.length > 0 ? (
              <List>
                {selectedPurifier.maintenanceRecords.map((record: MaintenanceRecord, index: number) => (
                  <ListItem key={index} divider={index < selectedPurifier.maintenanceRecords!.length - 1}>
                    <ListItemText
                      primary={`更換日期：${record.date}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            更換項目：{record.items.join('、')}
                          </Typography>
                          {record.notes && (
                            <Typography component="div" variant="body2" color="text.secondary">
                              備註：{record.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary" align="center">
                尚無更換紀錄
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>關閉</Button>
          </DialogActions>
        </Dialog>

        {/* 新增淨水器對話框 */}
        <PurifierAddForm
          open={isAddPurifierDialogOpen}
          onClose={handleCloseAddPurifier}
          onSubmit={handleAddPurifier}
        />
      </Box>
    </Layout>
  );
} 