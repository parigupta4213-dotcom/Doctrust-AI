import api from './api';

const DEMO_USER = {
  id: 'usr_demo_01',
  name: 'Pari Gupta',
  email: 'parigupta4213@gmail.com',
  role: 'AUDITOR',
  faceAuthEnrolled: true,
  createdAt: new Date().toISOString(),
};

export const authApi = {
  async register(data) {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (err) {
      console.warn('Live backend unavailable, falling back to local session:', err.message);
      const user = {
        id: `usr_${Date.now()}`,
        name: data.name || 'DocuTrust Auditor',
        email: data.email,
        role: 'AUDITOR',
        faceAuthEnrolled: false,
        createdAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: {
          token: `jwt_session_${Date.now()}`,
          user,
        },
      };
    }
  },

  async login(data) {
    try {
      const res = await api.post('/auth/login', data);
      return res.data;
    } catch (err) {
      console.warn('Live backend unavailable, falling back to local demo login:', err.message);
      const user = {
        id: 'usr_demo_01',
        name: data.email?.toLowerCase().includes('pari') ? 'Pari Gupta' : (data.email ? data.email.split('@')[0] : 'Enterprise Auditor'),
        email: data.email || 'parigupta4213@gmail.com',
        role: 'AUDITOR',
        faceAuthEnrolled: true,
        createdAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: {
          token: `jwt_session_${Date.now()}`,
          user,
        },
      };
    }
  },

  async getMe() {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      const stored = localStorage.getItem('docutrust_user');
      const user = stored ? JSON.parse(stored) : DEMO_USER;
      return {
        success: true,
        data: { user },
      };
    }
  },
};

export default authApi;
