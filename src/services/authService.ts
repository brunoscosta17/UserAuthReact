import axios from 'axios'

const API_URL = 'https://localhost:7026/api/auth'

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password })
  return data
}

export const register = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await axios.post(`${API_URL}/register`, payload)
  return data
}
