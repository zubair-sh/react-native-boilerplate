/**
 * i18next namespace type declarations.
 *
 * HOW TO ADD A NEW FEATURE NAMESPACE:
 *   1. Create  src/features/<name>/locales/en.json
 *   2. Add an import below
 *   3. Add the namespace key to CustomTypeOptions.resources
 *   4. Register it in src/i18n/index.ts
 *
 * That is the ONLY file outside a feature folder a developer needs to touch.
 */

import type commonEN from './locales/en/common.json';
import type authEN from '../features/auth/locales/en.json';
import type homeEN from '../features/home/locales/en.json';
import type profileEN from '../features/profile/locales/en.json';

/**
 * All available namespaces. Used as the type for the `ns` parameter
 * and for the `defaultNS` setting.
 */
export type AppNamespace = 'common' | 'auth' | 'home' | 'profile';

/**
 * Augment i18next's own types so that t() calls are fully type-safe
 * across all namespaces without any manual casting.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonEN;
      auth: typeof authEN;
      home: typeof homeEN;
      profile: typeof profileEN;
    };
  }
}
