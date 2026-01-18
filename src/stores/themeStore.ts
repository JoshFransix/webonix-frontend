import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: 'light' | 'dark'): void => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      actualTheme: getSystemTheme(),

      setTheme: (theme: Theme) => {
        const actualTheme = theme === 'system' ? getSystemTheme() : theme;
        applyTheme(actualTheme);
        set({ theme, actualTheme });
      },

      initializeTheme: () => {
        const { theme } = get();
        const actualTheme = theme === 'system' ? getSystemTheme() : theme;
        applyTheme(actualTheme);
        set({ actualTheme });

        // Listen for system theme changes
        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleChange = () => {
            const { theme } = get();
            if (theme === 'system') {
              const newActualTheme = getSystemTheme();
              applyTheme(newActualTheme);
              set({ actualTheme: newActualTheme });
            }
          };

          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
