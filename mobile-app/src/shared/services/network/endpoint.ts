import { ApiClient } from './axios.creation';

export default {
  requestLogin: (payload: any) => ApiClient.post('auth/login', payload),
  getProfile: () => ApiClient.get('users/profile'),
  getMedicalHistory: (payload: any) =>
    ApiClient.get('medical-history', { params: payload }),
  getPrescription: (payload: any) =>
    ApiClient.get('medical-history/order', { params: payload }),
};
