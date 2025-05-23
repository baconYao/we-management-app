export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "請輸入電子郵件";
  }
  if (!emailRegex.test(email)) {
    return "請輸入有效的電子郵件";
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "請輸入密碼";
  }
  if (password.length < 6) {
    return "密碼長度必須至少為 6 個字符";
  }
  return "";
};
