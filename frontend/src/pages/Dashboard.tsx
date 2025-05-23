import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { authService } from '../services/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" color="text.secondary">
            請先登入
          </Typography>
        </Box>
      </Container>
    );
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            歡迎，{currentUser.name}！
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            登出
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography component="span" color="text.secondary">
              電子郵件：
            </Typography>
            <Typography component="span" sx={{ ml: 1 }}>
              {currentUser.email}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" color="text.secondary">
              角色：
            </Typography>
            <Typography component="span" sx={{ ml: 1 }}>
              {currentUser.role}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
} 