export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Runs synchronously in <head>, before hydration, so the correct theme is
 * applied before first paint (no flash of the wrong theme). Dark is the
 * default whenever nothing has been stored yet — per the spec, dark mode
 * is the default regardless of the visitor's OS preference.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

type Listener = () => void;
const listeners = new Set<Listener>();

/** Subscribe to theme changes made via applyTheme() — for useSyncExternalStore. */
export function subscribeTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode, etc.) — theme still applies for this session.
  }
  listeners.forEach((listener) => listener());
}
