'use client';

import GuestOnlyRoute from '@/components/GuestOnlyRoute';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('brunoscosta17@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const loginPromise = fetch('https://localhost:7026/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      toast.promise(loginPromise, {
        loading: 'Logging in...',
        error: 'Login failed. Please try again.',
      });

      const res = await loginPromise;
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('refreshToken', data.refreshToken);

      setUser(data.user);

      router.push('/profile');
      toast.success(`Welcome, ${data.user.name}!`);
    } catch (err) {
        console.error(err);
        toast.error('Login failed.');
      setError('Network error.');
    }
  };

  return (
    <GuestOnlyRoute>
      <div className={styles.container}>
        <form className={styles.loginBox} onSubmit={submit}>
          <Image
            src="/react-logo.png"
            alt="React logo"
            width={80}
            height={80}
            className={styles.logo}
          />
          <h2 className={styles.title}>Login</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.button} type="submit">Login</button>

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.link}>
            Don’t have an account? <a href="/register">Create one</a>
          </p>
        </form>
      </div>
    </GuestOnlyRoute>
  );
}
