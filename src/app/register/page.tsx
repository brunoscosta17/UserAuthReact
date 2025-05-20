'use client';

import GuestOnlyRoute from '@/components/GuestOnlyRoute';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from 'react-hot-toast';
import styles from './register.module.css';

export default function RegisterPage() {
   const router = useRouter();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch('https://localhost:7026/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),

            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Registration failed');
                toast.error(data.message || 'Registration failed.');
                return;
            }

            toast.success('Account created successfully!');
            router.push('/login');

        } catch (err) {
            console.error(err);
            setError('Network error.');
            toast.error('Network error.');
        }
    };

    return (
        <GuestOnlyRoute>
            <div className={styles.container}>
                <form className={styles.registerBox} onSubmit={submit}>
                    <h2 className={styles.title}>Register</h2>

                    <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>

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

                    <button className={styles.button} type="submit">Register</button>

                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}

                    <p className={styles.link}>
                    Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </GuestOnlyRoute>
    );
}
