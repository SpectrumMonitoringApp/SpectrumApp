import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from './apiUrl';

/**
 * Get current user
 * @returns {Promise<any | never>}
 */
export async function getCurrentUser() {
  const url = `${apiUrl()}/auth/me`;

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()
    }
  }).then(checkResponse);
}
