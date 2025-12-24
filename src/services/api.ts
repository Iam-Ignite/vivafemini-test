import axios from 'axios';
import { API_URL } from '@/lib/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User endpoints
export const userService = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: any) => api.patch('/users/me', data),
  dismissCard: (cardId: string) => api.post('/users/me/dismiss-card', { cardId }),
};

// Cycle endpoints
export const cycleService = {
  getAll: () => api.get('/cycles'),
  getCurrent: () => api.get('/cycles/current'),
  getPredictions: () => api.get('/cycles/predictions'),
  create: (startDate: string) => api.post('/cycles', { startDate }),
  updatePregnancyTest: (id: string, result: string) =>
    api.patch(`/cycles/${id}/pregnancy-test`, { result }),
};

// Tracking endpoints
export const trackingService = {
  getLogs: (limit?: number) => api.get('/tracking', { params: { limit } }),
  getByDate: (date: string) => api.get(`/tracking/${date}`),
  getCalendar: (year: number, month: number) => api.get(`/tracking/calendar/${year}/${month}`),
  create: (data: any) => api.post('/tracking', data),
  update: (date: string, data: any) => api.patch(`/tracking/${date}`, data),
  delete: (date: string) => api.delete(`/tracking/${date}`),
};

// Health Report endpoints
export const healthReportService = {
  getSummary: () => api.get('/health-report/summary'),
  getSymptomFrequency: () => api.get('/health-report/symptom-frequency'),
  getPeriodLength: () => api.get('/health-report/period-length'),
  getHistorical: (page?: number, limit?: number) =>
    api.get('/health-report/historical', { params: { page, limit } }),
  getTrends: () => api.get('/health-report/trends'),
  getFlowSummary: () => api.get('/health-report/flow-summary'),
};

// Articles endpoints
export const articlesService = {
  getAll: (limit?: number) => api.get('/articles', { params: { limit } }),
  getById: (id: string) => api.get(`/articles/${id}`),
};

// Tips endpoints
export const tipsService = {
  getAll: () => api.get('/tips'),
  getByCycleDay: (day: number) => api.get(`/tips/day/${day}`),
};

export default api;
