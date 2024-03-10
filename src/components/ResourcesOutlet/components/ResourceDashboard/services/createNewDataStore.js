import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Create new Data Store for corresponding resource
 * @param workspaceId
 * @param resourceId
 * @param dataStoreName
 * @returns {Promise<Promise>}
 */
export async function createNewDataStore(workspaceId, resourceId, dataStoreName) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}/data-stores`);

  if (workspaceId) url.searchParams.set('workspaceId', workspaceId);

  const payload = {
    name: dataStoreName
  }

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()

    },
    body: JSON.stringify(payload)
  }).then(checkResponse);
}