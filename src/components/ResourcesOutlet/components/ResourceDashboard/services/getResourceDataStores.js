import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Get data stores corresponding to the resource
 * @param workspaceId
 * @param resourceId
 * @returns {Promise<Promise>}
 */
export async function getResourceDataStores(workspaceId, resourceId) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}/data-stores`);

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