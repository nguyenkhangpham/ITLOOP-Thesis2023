import { ApiClient } from "./api.creation";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  requestLogin: (payload: any) => ApiClient.post("auth/login", payload),
  getProfile: () => ApiClient.get("users/profile"),
  getUser: (payload: any) => ApiClient.get("users", { params: payload }),
  requestRegister: (payload: any) => ApiClient.post("auth/register", payload),
  getMedicines: () => ApiClient.get("medicines"),
  requestAddMedicine: (payload: any) => ApiClient.post("medicines", payload),
  getMedicalHistory: (payload: any) =>
    ApiClient.get("medical-history", { params: payload }),
  requestCreateMedicalHistory: (payload: any) =>
    ApiClient.post("medical-history", payload),
  requestCreatePrescription: (payload: any) =>
    ApiClient.post("medical-history/order", payload),
  getPrescription: (payload: any) =>
    ApiClient.get("medical-history/order", { params: payload }),
};
