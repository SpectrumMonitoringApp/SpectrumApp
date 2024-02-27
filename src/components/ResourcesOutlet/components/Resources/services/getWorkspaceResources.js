import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Get all workspace resources user has access to
 * @param workspaceId
 * @returns {Promise<Promise>}
 */
export async function getWorkspaceResources(workspaceId) {
  const url = new URL(`${apiUrl()}/resources`);

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
