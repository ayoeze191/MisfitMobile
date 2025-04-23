import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createStorageWrapper = (storage: any) => ({
  storeObject: async (key: string, data: any) =>
    await storage.setItem(key, JSON.stringify(data)),
  storeString: async (key: string, data: any) =>
    await storage.setItem(key, data),
  getObject: async (key: string) => {
    const storedData = await storage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  },
  getString: async (key: string) => (await storage.getItem(key)) || '',
  remove: async (key: string) => await storage.removeItem(key),
});

const STORAGE = {
  SECURE: createStorageWrapper(EncryptedStorage),
  NON_SECURE: createStorageWrapper(AsyncStorage),
};

export default STORAGE;
