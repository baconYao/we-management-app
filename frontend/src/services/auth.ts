interface User {
  name: string;
  email: string;
  role: string;
}

class AuthService {
  private currentUser: User | null = null;

  login(email: string, password: string): [boolean, string] {
    // TODO: Replace with actual API call
    if (email === "admin@example.com" && password === "Admin123") {
      this.currentUser = {
        name: "Test User",
        email: "admin@example.com",
        role: "admin",
      };
      return [true, ""];
    }
    return [false, "Invalid email or password"];
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService = new AuthService();
