'use client';

import { isTokenExpired } from '@/utils/jwt';
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (token && stored) {
            try {
                if (!isTokenExpired(token)) {
                    setUser(JSON.parse(stored));
                } else {
                    localStorage.clear();
                }
                } catch {
                localStorage.clear();
                }
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
