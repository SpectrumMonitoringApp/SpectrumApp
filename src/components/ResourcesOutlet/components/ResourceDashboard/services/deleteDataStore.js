import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Delete Resource Data Store by id
 * @param workspaceId
 * @param resourceId
 * @param dataStoreId
 * @returns {Promise<Promise>}
 */
export async function deleteDataStore(workspaceId, resourceId, dataStoreId) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}/data-stores/${dataStoreId}`);

  if (workspaceId) url.searchParams.set('workspaceId', workspaceId);

  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()

    }
  }).then(checkResponse);
}