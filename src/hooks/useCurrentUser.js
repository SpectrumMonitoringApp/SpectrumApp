import { useContext } from 'react';

import { CurrentUserContext } from '../services/CurrentUserContext/CurrentUserContext';

export const useCurrentUser = () => useContext(CurrentUserContext);
