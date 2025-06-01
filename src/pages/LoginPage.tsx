import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../auth'
import { API_BASE_URL } from '../utils/api'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login: setUser } = useAuth()

  const [email, setEmail] = useState('brunoscosta17@gmail.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const loginPromise = fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      toast.promise(loginPromise, {
        pending: 'Logging in...',
        success: 'Logged in successfully!',
        error: 'Login failed. Please try again.',
      })

      const res = await loginPromise
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed.')
        setLoading(false)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('refreshToken', data.refreshToken)

      setUser(data.user)
      navigate('/profile')
    } catch (err) {
      console.error(err)
      toast.error('Login failed.')
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginBox} onSubmit={submit}>
        <img src="./react-logo.png" alt="React logo" className={styles.logo} />
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

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.link}>
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  )
}
