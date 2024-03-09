import {
  apiUrl,
  getStandardHeaders,
  checkResponse,
  getAuthorizationHeaders
} from '../../../../../services/apiUrl';

/**
 * Update existing resource
 * @param workspaceId
 * @param resourceId
 * @param resource
 * @param resourceCredentials
 * @returns {Promise<Promise>}
 */
export async function updateResource(workspaceId, resourceId, resource, resourceCredentials) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}`);
  const payload = { resource, resourceCredentials };

  if (workspaceId) url.searchParams.set('workspaceId', workspaceId);

  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()

    },
    body: JSON.stringify(payload)
  }).then(checkResponse);
}
