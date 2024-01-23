import { apiUrl, getStandardHeaders, checkResponse } from '../../../services/apiUrl';

/**
 * Create new user
 * @param fullName
 * @param email
 * @param password
 * @returns {Promise<Response>}
 */
export async function handleUserSignUp(fullName, email, password) {
  const url = `${apiUrl()}/auth/sign-up`;
  const payload = {
    fullName, email, password
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
