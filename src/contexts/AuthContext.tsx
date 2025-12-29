import { createContext, useContext, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (identifier: string, password: string) => {
    const response = await authService.signin({
      identifier,
      password,
    });

    if (!response.success) {
      throw new Error(response.message || 'Error al iniciar sesión');
    }
    
    navigate('/home');
  };

  const logout = () => {
    setUser(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
