'use client';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { useEffect, useState } from 'react';
import styles from './profile.module.css';

export interface User {
  id: number;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7026/api/profile/me');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Invalid session.', err);
        localStorage.clear();
        window.location.href = '/login';
      }
    };

    loadProfile();
  }, []);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Welcome, {user.name}!</h2>
        <p className={styles.paragraph}>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
