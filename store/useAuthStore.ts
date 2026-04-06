import { create } from 'zustand';
import { Platform } from 'react-native';

export type UserTier = 'free' | 'pro' | 'premium';

interface AuthState {
  isAuthenticated: boolean;
  isLogoutModalVisible: boolean;
  user: any | null;
  tier: UserTier;
  _hydrated: boolean;
  login: (userData: any) => void;
  logout: () => void;
  setLogoutModalVisible: (visible: boolean) => void;
  updateTier: (newTier: UserTier) => void;
}

// Simple cross-platform storage helpers
const STORAGE_KEY = 'trueict-auth-storage';

const saveToStorage = (data: { isAuthenticated: boolean; user: any; tier: UserTier }) => {
  try {
    const json = JSON.stringify(data);
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, json);
    }
  } catch (e) {
    // Silently fail
  }
};

const loadFromStorage = (): { isAuthenticated: boolean; user: any; tier: UserTier } | null => {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      const json = window.localStorage.getItem(STORAGE_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        // Ensure tier is a valid UserTier
        if (!parsed.tier) parsed.tier = 'free';
        return parsed;
      }
    }
  } catch (e) {
    // Silently fail
  }
  return null;
};

const clearStorage = () => {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    // Silently fail
  }
};

// Load persisted state on startup
const persisted = loadFromStorage();

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: persisted?.isAuthenticated ?? false,
  user: persisted?.user ?? null,
  tier: persisted?.tier ?? 'free',
  isLogoutModalVisible: false,
  _hydrated: true,
  login: (userData) => {
    const newState = { 
      isAuthenticated: true, 
      user: userData, 
      tier: (persisted?.tier ?? 'free') as UserTier 
    };
    saveToStorage(newState);
    set({ ...newState });
  },
  logout: () => {
    clearStorage();
    set({ isAuthenticated: false, user: null, tier: 'free', isLogoutModalVisible: false });
  },
  setLogoutModalVisible: (visible) => set({ isLogoutModalVisible: visible }),
  updateTier: (newTier) => {
    const state = get();
    const newState = { 
      isAuthenticated: state.isAuthenticated, 
      user: state.user, 
      tier: newTier 
    };
    saveToStorage(newState);
    set({ tier: newTier });
  },
}));
