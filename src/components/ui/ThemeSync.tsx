'use client';

import { useLayoutEffect } from 'react';
import { applyTheme, getStoredTheme } from '@/lib/theme';

/**
 * Re-applies the persisted theme on every mount of the locale layout.
 *
 * The beforeInteractive init script (see `themeInitScript`) only runs once,
 * on the very first document load — it does not re-run on a client-side
 * route transition. Switching language calls next-intl's `router.replace`,
 * which changes the `[locale]` dynamic segment and causes `LocaleLayout` to
 * remount, including the `<html data-theme="dark">` literal in its JSX.
 * React commits that hardcoded "dark" on the fresh mount, overwriting
 * whatever `applyTheme()` had previously set on the DOM — even though
 * localStorage still holds the visitor's real choice (e.g. "light").
 *
 * Rendering this component inside the layout re-syncs `data-theme` from
 * localStorage every time that subtree mounts, so a language switch can no
 * longer flip the theme. `useLayoutEffect` (not `useEffect`) runs
 * synchronously before the browser paints the new frame, so there's no
 * visible flash back to dark in between.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return null;
}
