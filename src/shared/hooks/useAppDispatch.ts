import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@store/store';

/**
 * Typed dispatch hook.
 * Always use this instead of plain useDispatch() so RTK Query thunks are typed.
 *
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(logout());
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
