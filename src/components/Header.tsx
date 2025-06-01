import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <header className={styles.header}>
      <div><strong>Welcome, {user.name}</strong></div>
      <nav className={styles.nav}>
        <Link to="/profile" className={styles.link}>Profile</Link>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </nav>
    </header>
  )
}



/*
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  const location = useLocation();

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if (location.pathname === '/UserAuthReact/login' || location.pathname === '/UserAuthReact/register') {
    return null; // Não exibe o header nessas páginas
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>UserAuthApp</div>
      <nav className={styles.nav}>
        <Link to="/UserAuthReact/profile">Profile</Link>
        {isLoggedIn && (
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.clear();
              window.location.href = '/UserAuthReact/login';
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

*/
