/**
 * @deprecated Moved to @shared/services/tokenStorage.
 * This shim exists only so older relative imports don't break at runtime.
 * Update imports to use '@shared/services/tokenStorage' directly.
 */
// Re-export via full relative path so Metro resolves it without alias lookup
export { tokenStorage } from '../../../shared/services/tokenStorage';
