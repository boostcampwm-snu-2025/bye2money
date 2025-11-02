export const baseUrl = {
  development: 'http://localhost:3001',
  production: '',
}[import.meta.env.MODE] || '';
