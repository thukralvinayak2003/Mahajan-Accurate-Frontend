// utils/authStorage.ts
import * as SecureStore from 'expo-secure-store';

export const saveTokens = async (tokens: { accessToken: string; refreshToken: string }) => {
  await SecureStore.setItemAsync('accessToken', tokens.accessToken);
  await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync('accessToken');
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync('refreshToken');
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
};
