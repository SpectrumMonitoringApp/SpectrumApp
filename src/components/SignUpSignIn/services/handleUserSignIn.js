import { apiUrl, getStandardHeaders, checkResponse } from '../../../services/apiUrl';

/**
 * Sign In as an existing user and return Access Token
 * @param email
 * @param password
 * @returns {Promise<Response>}
 */
export async function handleUserSignIn(email, password) {
  const url = `${apiUrl()}/auth/sign-in`;
  const payload = {
    email, password
  };

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...getStandardHeaders()
    },
    body: JSON.stringify(payload)
  }).then(checkResponse);
}
