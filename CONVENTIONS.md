# react-native-boilerplate — Developer Conventions

> Read this before writing your first line of code.

---

## Naming Conventions

| Entity          | Convention                           | Example                                          |
| --------------- | ------------------------------------ | ------------------------------------------------ |
| Components      | `PascalCase`                         | `LoginForm.tsx`, `UserAvatar.tsx`                |
| Hooks           | `use` prefix                         | `useAuth.ts`, `useDebounce.ts`                   |
| Redux slices    | `xSlice` suffix                      | `authSlice.ts`, `profileSlice.ts`                |
| RTK Query APIs  | `xApi` suffix                        | `authApi.ts`, `ordersApi.ts`                     |
| Type files      | `x.types.ts` suffix                  | `auth.types.ts`                                  |
| Constants       | `SCREAMING_SNAKE_CASE`               | `API_BASE_URL`, `MAX_RETRY_COUNT`                |
| Locale keys     | nested `camelCase`                   | `auth.login.title`, `common.validation.required` |
| Screens         | `XScreen.tsx` suffix (in `screens/`) | `LoginScreen.tsx`                                |
| Services        | `xService.ts` suffix                 | `tokenStorage.ts`, `analyticsService.ts`         |
| Feature barrels | `index.ts` at feature root           | re-export public API only                        |

---

## Folder Structure

```
src/
├── features/
│   └── <name>/
│       ├── components/     # Feature-private UI components
│       ├── hooks/          # Feature-private hooks
│       ├── screens/        # Full-page screen components
│       ├── services/       # API files, storage helpers
│       ├── store/          # Redux slice for this feature
│       ├── types/          # TypeScript types (x.types.ts)
│       ├── locales/        # Translation files (en.json, ar.json, ...)
│       └── index.ts        # ← BARREL: public API of this feature
├── shared/                 # Cross-feature utilities (team discussion required)
│   ├── components/         # Generic UI (Button, Input, Card, ...)
│   ├── hooks/              # useAppDispatch, useAppSelector, useDebounce, ...
│   ├── utils/              # Pure functions (formatDate, validators, ...)
│   └── constants/          # SCREAMING_SNAKE constants
├── store/
│   ├── rootReducer.ts      # combineReducers
│   └── store.ts            # configureStore + persistor
├── theme/
│   └── index.ts            # Restyle theme, darkTheme, useTheme()
└── i18n/
    ├── index.ts            # i18next init
    ├── types.ts            # Namespace type declarations
    └── locales/en/
        └── common.json     # Shared translation keys
```

---

## Feature Isolation Rules

### ✅ Allowed

```ts
// Importing from another feature's barrel
import { useAuth } from '@features/auth';
import type { User } from '@features/auth';

// Importing from shared/
import { useAppSelector } from '@shared/hooks/useAppSelector';
import { Button } from '@shared/components/Button';
```

### ❌ Forbidden

```ts
// Importing a feature's internals directly
import { authSlice } from '@features/auth/store/authSlice'; // ❌
import { tokenStorage } from '@features/auth/services/tokenStorage'; // ❌
import { useLoginMutation } from '@features/auth/services/authApi'; // ❌
```

> **Why?** Internal imports create hidden coupling. If the auth team refactors their internals, every file that imported directly will break. Barrel imports let the auth team refactor freely.

---

## Team Workflow — Avoiding Merge Conflicts

### Feature folder ownership

Each developer **owns** their feature folder. PRs should not modify another developer's feature internals. If they must, that requires an explicit review from the owner.

| Feature                 | Owner                                        |
| ----------------------- | -------------------------------------------- |
| `src/features/auth/`    | Auth developer                               |
| `src/features/home/`    | Home developer                               |
| `src/features/profile/` | Profile developer                            |
| `src/shared/`           | Shared — open to all, requires PR discussion |

### Adding a new feature

1. Create `src/features/<name>/` with standard sub-folders.
2. Create `src/features/<name>/locales/en.json` (your translations).
3. Add **one import** to `src/i18n/index.ts` and `src/i18n/types.ts`.
4. Add **one line** to `src/store/rootReducer.ts` for your slice.
5. Register your API middleware in `src/store/store.ts`.

These shared files have minimal, additive changes — one line per feature — so conflicts are impossible in practice.

### What goes in `src/shared/`?

`shared/` is for **generic, feature-agnostic** code only:

- ✅ `Button`, `Input`, `Card` — no business logic
- ✅ `useDebounce`, `useKeyboard` — pure utility hooks
- ✅ `formatDate`, `validateEmail` — pure functions
- ❌ `useAuth` — feature-specific → goes in `src/features/auth/hooks/`
- ❌ `OrderCard` — references order data → goes in `src/features/orders/components/`

When in doubt: if it imports from a feature, it's not shared.

---

## Import Path Aliases

Always use aliases. Never use `../../..` relative paths outside a feature's own folder.

| Alias         | Resolves to      |
| ------------- | ---------------- |
| `@features/*` | `src/features/*` |
| `@shared/*`   | `src/shared/*`   |
| `@store/*`    | `src/store/*`    |
| `@theme/*`    | `src/theme/*`    |
| `@i18n/*`     | `src/i18n/*`     |
| `@services/*` | `src/services/*` |

---

## Localization

Each feature owns its namespace:

```ts
// In auth screens only
const { t } = useTranslation('auth');
t('login.title');

// In home screens only
const { t } = useTranslation('home');

// Anywhere (default namespace)
const { t } = useTranslation();
t('common.error');
```

Adding a new language:

1. Create `src/features/<name>/locales/<lang>.json` for each feature.
2. Create `src/i18n/locales/<lang>/common.json`.
3. Add the language block to `src/i18n/index.ts`.

---

## Git Commit Convention

```
feat(auth): add refresh token rotation
fix(home): correct greeting interpolation
chore(i18n): add Arabic translations for profile
refactor(shared): extract Button into shared/components
```

Format: `type(scope): description`
Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`
