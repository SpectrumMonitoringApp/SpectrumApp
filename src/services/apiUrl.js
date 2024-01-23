/**
 * Variable for AccessToken key in LocalStorage
 */
export const spectrumAccessTokenLocalStorageKey = 'SpectrumAccessToken';

/**
 * Return API URL with respect to the existing domain
 * @returns {string}
 */
export function apiUrl() {
  return 'http://localhost:8000';
}

/**
 * Return headers standard across the whole application
 */
export function getStandardHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8'
  };
}

/**
 * Return Authorization header object with Access Token retrieved from localStorage
 */
export function getAuthorizationHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem(spectrumAccessTokenLocalStorageKey)}`
  };
}

/**
 * This is a helper function to check response and throw an error on error code below 200 and above 299
 * @param fetchResponse
 * @returns {Promise|Object}
 */
export function checkResponse(fetchResponse) {
  const redirectSkipPathnames = ['/sign-up', '/sign-in'];

  if (fetchResponse.status === 204) return {};

  if (fetchResponse.ok) return fetchResponse.json();

  if (fetchResponse.status === 401 && !redirectSkipPathnames.includes(window.location.pathname))
    setTimeout(() => {
      window.location.replace('/sign-in');
    }, 0);

  return fetchResponse.json().then((err) => {
    throw err;
  });
}