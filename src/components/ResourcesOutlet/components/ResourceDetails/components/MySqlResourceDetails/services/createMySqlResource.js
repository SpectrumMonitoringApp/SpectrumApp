import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../../../services/apiUrl';

/**
 * Create a new MySQL resource
 * @param mySqlResource
 * @returns {Promise<Promise>}
 */
export async function createMySqlResource(mySqlResource) {
  const url = `${apiUrl()}/resources/my-sql`;

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()

    },
    body: JSON.stringify(mySqlResource)
  }).then(checkResponse);
}
