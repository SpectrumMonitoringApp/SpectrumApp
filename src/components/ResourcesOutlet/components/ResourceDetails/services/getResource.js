import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Get resource by id
 * @param resourceId
 * @returns {Promise<Promise>}
 */
export async function getResource(workspaceId, resourceId) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}`);

  if (workspaceId) url.searchParams.set('workspaceId', workspaceId);

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()
    }
  }).then(checkResponse);
}