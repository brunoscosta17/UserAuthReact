'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/fetch-with-auth';
import { API_BASE_URL } from '../utils/api';
import styles from './ProfilePage.module.css';

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
        const res = await fetchWithAuth(`${API_BASE_URL}/api/profile/me`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Invalid session.', err);
        localStorage.clear();
        window.location.href = '/UserAuthReact/login';
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/UserAuthReact/login';
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Welcome, {user.name}!</h2>
        <p className={styles.paragraph}>
          <strong>Email:</strong> {user.email}
        </p>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
