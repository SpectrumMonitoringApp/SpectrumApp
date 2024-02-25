import { useEffect, useReducer } from 'react';
import to from 'await-to-js';

import currentUserReducer from '../reducers/currentUserReducer/currentUserReducer';
import initialState from '../reducers/currentUserReducer/initialState';
import { CurrentUserContext } from './CurrentUserContext';
import { spectrumAccessTokenLocalStorageKey } from '../apiUrl';
import { getCurrentUser } from '../proceedCurrentUser';

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, initialState);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  /**
   * Get current user information
   * @returns {Promise<void>}
   */
  async function fetchCurrentUser() {
    const bearerTokenExists = localStorage.getItem(spectrumAccessTokenLocalStorageKey);

    if (!bearerTokenExists) return;

    const [err, res] = await to(getCurrentUser());

    if (err) return;

    const userData = {
      email: res.email,
      fullName: res.fullName
    };

    dispatch({ type: 'SET_USER', payload: userData });
  }

  // Provide both the user state and the dispatch function to the context
  return (
    <CurrentUserContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrentUserContext.Provider>
  );
};