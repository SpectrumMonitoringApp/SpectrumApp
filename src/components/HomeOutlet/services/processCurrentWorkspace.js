import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../services/apiUrl';

/**
 * Get currently selected workspace by id
 * @param workspaceId
 * @returns {Promise<Promise>}
 */
export async function processCurrentWorkspace(workspaceId) {
  const url = new URL(`${apiUrl()}/workspaces/${workspaceId}`);

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()
    }
  }).then(checkResponse);
}