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
} from '@mui/material';
import Layout from '../components/Layout';
import type { Customer } from '../mock/customers';
import { initialCustomers } from '../mock/customers';

export default function CustomerDetail() {
  const { uid } = useParams<{ uid: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // 在實際應用中，這裡會是 API 調用
    const foundCustomer = initialCustomers.find(c => c.uid === uid);
    setCustomer(foundCustomer || null);
  }, [uid]);

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
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            基本資訊
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {/* 左側資訊 */}
            <Grid item xs={12} md={6}>
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
            </Grid>

            {/* 右側資訊 */}
            <Grid item xs={12} md={6}>
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
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {customer.socialMedia?.line && (
                      <Chip
                        label={`Line: ${customer.socialMedia.line}`}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    )}
                    {customer.socialMedia?.facebook && (
                      <Chip
                        label={`Facebook: ${customer.socialMedia.facebook}`}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    )}
                    {customer.socialMedia?.wechat && (
                      <Chip
                        label={`WeChat: ${customer.socialMedia.wechat}`}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    )}
                    {customer.socialMedia?.whatsapp && (
                      <Chip
                        label={`WhatsApp: ${customer.socialMedia.whatsapp}`}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    )}
                    {!customer.socialMedia && (
                      <Typography variant="body2" color="text.secondary">
                        無通訊軟體資訊
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
} 