/**
 * i18n initialization — loaded once at app boot (import side-effect in _layout.tsx).
 *
 * Architecture: one i18next namespace per feature.
 * Each feature developer only ever edits:
 *   src/features/<name>/locales/en.json   ← their own namespace
 *
 * To add a new language (e.g. Arabic):
 *   1. Create  src/features/<name>/locales/ar.json  for each feature
 *   2. Create  src/i18n/locales/ar/common.json
 *   3. Import and add to the `resources` object below under the 'ar' key
 */

import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Feature namespaces — each file is owned by its feature developer
import commonEN from './locales/en/common.json';
import authEN from '../features/auth/locales/en.json';
import homeEN from '../features/home/locales/en.json';
import profileEN from '../features/profile/locales/en.json';

// Shared namespace — owned by the shared/ team

// Side-effect import: activates module-augmentation types
import './types';

// Re-export typed key unions — import via '@i18n/keys'
export type { AuthTKey, CommonTKey, HomeTKey, ProfileTKey } from './keys';

/**
 * Detect device locale (e.g. "en-US", "ar-SA").
 * getLocales() returns an ordered array — first entry is the user's primary locale.
 * We take the language code only (strip region suffix).
 */
const deviceLocale = getLocales()[0]?.languageCode ?? 'en';

const SUPPORTED_LANGUAGES = ['en'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function resolveLanguage(locale: string): SupportedLanguage {
  const lang = locale.split('-')[0] as SupportedLanguage;
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
}

i18n.use(initReactI18next).init({
  // ─── Resources ───────────────────────────────────────────────────────────
  // One key per language, one sub-key per namespace (feature).
  resources: {
    en: {
      common: commonEN,
      auth: authEN,
      home: homeEN,
      profile: profileEN,
    },
    // ar: {
    //   common: commonAR,
    //   auth:   authAR,
    //   home:   homeAR,
    //   profile: profileAR,
    // },
  },

  // ─── Namespace config ────────────────────────────────────────────────────
  defaultNS: 'common', // useTranslation() with no args → common namespace
  ns: ['common', 'auth', 'home', 'profile'],

  // ─── Language config ─────────────────────────────────────────────────────
  lng: resolveLanguage(deviceLocale),
  fallbackLng: 'en',

  // ─── Interpolation ───────────────────────────────────────────────────────
  interpolation: {
    escapeValue: false, // React already escapes output
  },
});

export default i18n;
