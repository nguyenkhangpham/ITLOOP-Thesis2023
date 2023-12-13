import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  private static instance: Storage;

  private constructor() {}

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  async loadString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async saveString(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  async load(key: string): Promise<any | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value!);
    } catch {
      return null;
    }
  }

  async save(key: string, value: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {}
  }
}

export default Storage.getInstance();
