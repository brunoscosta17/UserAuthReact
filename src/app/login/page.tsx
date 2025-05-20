'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://localhost:7026/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/profile');
    } catch (err) {
        console.error(err);
      setError('Network error.');
    }
  };

  return (
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
  );
}
