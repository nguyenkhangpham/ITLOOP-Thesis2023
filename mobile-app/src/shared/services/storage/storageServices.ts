import {
  ROLE_STR_KEY,
  TOKEN_STR_KEY,
  USER_LNG_STR_KEY,
  X_DEVICE_ID_STR_KEY,
} from '../../../configs';
import Storage from './Storage';
import { TTokenParams } from './storageServices.type';

async function getToken(): Promise<TTokenParams> {
  let token = await Storage.loadString(TOKEN_STR_KEY);
  if (token) return JSON.parse(token);
  else return { accessToken: undefined, refreshToken: undefined };
}

function putToken(value: TTokenParams) {
  return Storage.saveString(TOKEN_STR_KEY, JSON.stringify(value));
}

function putXDeviceId(value: string) {
  return Storage.saveString(X_DEVICE_ID_STR_KEY, value);
}

function getXDeviceId() {
  return Storage.loadString(X_DEVICE_ID_STR_KEY);
}

function getRole() {
  return Storage.load(ROLE_STR_KEY);
}

function putRole(value: any) {
  return Storage.save(ROLE_STR_KEY, value);
}

function getUserLng() {
  return Storage.loadString(USER_LNG_STR_KEY);
}

function putUserLng(value: string) {
  return Storage.saveString(USER_LNG_STR_KEY, value);
}

export default {
  getToken,
  putToken,
  putXDeviceId,
  getXDeviceId,
  getRole,
  putRole,
  getUserLng,
  putUserLng,
};
