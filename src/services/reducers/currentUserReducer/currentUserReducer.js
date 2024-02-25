/**
 * Current User Reducer handler
 * @param state
 * @param action
 * @returns {(*&{user: SourceMapPayload | {urlsToCache: RequestArgs[]} | Record<string, any>})|*|(*&{user: null})}
 */
export default function currentUserReducer (state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};
