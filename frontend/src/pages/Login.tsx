import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { authService } from '../services/auth';
import { validateEmail, validatePassword } from '../utils/validation';

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Try Login ');
    
    // Validate form
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setEmailError(emailError);
    setPasswordError(passwordError);
    
    if (emailError || passwordError) {
      setError('請修正表單中的錯誤');
      return;
    }

    // Attempt login
    const [success, message] = authService.login(email, password);
    console.log('Login result:', { success, message });
    
    if (success) {
      console.log('Login successful');
      // Clear form
      setEmail('');
      setPassword('');
      setError('');
      
      // Navigate to dashboard
      console.log('Attempting to navigate to dashboard...');
      navigate('/dashboard', { replace: true });
      console.log('Navigation called');
    } else {
      setError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: isMobile ? 2 : 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: 400,
            md: 450,
          },
          mx: 'auto',
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 1,
              fontSize: {
                xs: '1.75rem',
                sm: '2rem',
                md: '2.125rem',
              },
            }}
          >
            登入
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              textAlign: 'center',
              fontSize: {
                xs: '0.875rem',
                sm: '1rem',
              },
            }}
          >
            請登入以繼續
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="電子郵件"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value));
              }}
              error={!!emailError}
              helperText={emailError}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
              }}
              error={!!passwordError}
              helperText={passwordError}
              size={isMobile ? "small" : "medium"}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: isMobile ? 1 : 1.5,
              }}
            >
              登入
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="#" variant="body2">
                忘記密碼？
              </Link>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" component="span" color="text.secondary">
                還沒有帳號？
              </Typography>
              <Link href="#" variant="body2" sx={{ ml: 1 }}>
                註冊
              </Link>
            </Box>

            {import.meta.env.DEV && (
              <Alert severity="info" sx={{ mt: 3 }}>
                測試帳號：<br />
                電子郵件：admin@example.com<br />
                密碼：Admin123
              </Alert>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 