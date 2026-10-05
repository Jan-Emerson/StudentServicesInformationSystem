import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/api.js';

const AuthContext = createContext(null);

function loadUser() {
  try {
    const token = localStorage.getItem('ssis_token');
    const raw   = localStorage.getItem('ssis_user');

    // Both must exist and the token must look like a JWT (3 parts)
    if (!token || !raw) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Check token expiry from the payload without a library
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token expired — clear storage
      localStorage.removeItem('ssis_token');
      localStorage.removeItem('ssis_user');
      return null;
    }

    return JSON.parse(raw);
  } catch {
    localStorage.removeItem('ssis_token');
    localStorage.removeItem('ssis_user');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = useCallback(async (student_number, password) => {
    const data = await api.post('/auth/login', { student_number, password });
    localStorage.setItem('ssis_token', data.token);
    localStorage.setItem('ssis_user',  JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ssis_token');
    localStorage.removeItem('ssis_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
