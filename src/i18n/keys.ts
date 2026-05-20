/**
 * Typed translation key utilities.
 *
 * Because CustomTypeOptions.resources is augmented with the actual JSON shapes,
 * i18next derives a union of all valid dot-notation keys per namespace.
 *
 * These helpers let you reference keys as values (e.g. for Zod schemas
 * or constants) while keeping full type safety.
 *
 * @example
 *   const key: AuthTKey = 'login.title';         // ✅
 *   const bad: AuthTKey = 'login.nonExistent';   // ❌ TypeScript error
 */
import type { CustomTypeOptions } from 'i18next';

// ─── Utility: derive dot-notation key union from a nested object type ─────────

type DotNotation<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? DotNotation<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

// ─── Per-namespace key types ──────────────────────────────────────────────────

/** All valid keys for the 'auth' namespace. */
export type AuthTKey = DotNotation<CustomTypeOptions['resources']['auth']>;

/** All valid keys for the 'common' namespace. */
export type CommonTKey = DotNotation<CustomTypeOptions['resources']['common']>;

/** All valid keys for the 'home' namespace. */
export type HomeTKey = DotNotation<CustomTypeOptions['resources']['home']>;

/** All valid keys for the 'profile' namespace. */
export type ProfileTKey = DotNotation<CustomTypeOptions['resources']['profile']>;
