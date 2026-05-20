import { useSelector, type TypedUseSelectorHook } from 'react-redux';

import type { RootState } from '@store/rootReducer';

/**
 * Typed selector hook.
 * Always use this instead of plain useSelector() for full state type inference.
 *
 * @example
 * const user = useAppSelector((state) => state.auth.user);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
