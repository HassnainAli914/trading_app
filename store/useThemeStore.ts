import { create } from 'zustand';
import { Platform } from 'react-native';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const THEME_KEY = 'trueict-theme-storage';

const loadTheme = (): boolean => {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(THEME_KEY);
      if (val !== null) return JSON.parse(val);
    }
  } catch (e) {}
  return true; // Default to dark mode
};

const saveTheme = (isDark: boolean) => {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    }
  } catch (e) {}
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: loadTheme(),
  toggleTheme: () =>
    set((state) => {
      const next = !state.isDarkMode;
      saveTheme(next);
      return { isDarkMode: next };
    }),
}));
