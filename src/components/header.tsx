'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#f0f2f5',
      borderBottom: '1px solid #ccc',
    }}>
      <strong style={{ fontSize: '1.2rem' }}>ReactAuthApp</strong>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>👤 {user.name}</span>
        <button
          style={{
            padding: '0.4rem 0.8rem',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            logout();
            toast.success('You have been logged out!');
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
