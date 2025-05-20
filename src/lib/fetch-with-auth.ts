import { isTokenExpiringSoon } from '@/utils/jwt';

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  let token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');

  const email = user ? JSON.parse(user).email : null;

  if (token && refreshToken && email && isTokenExpiringSoon(token)) {
    const refreshRes = await fetch('https://localhost:7026/api/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, refreshToken }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      token = data.token;
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
    } else {
      localStorage.clear();
      throw new Error('Session expired. Please log in again.');
    }
  }

  const headers = {
    ...(init.headers || {}),
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  return fetch(input, {
    ...init,
    headers,
  });
}
