import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Get all workspaces user has access to
 * @returns {Promise<any | never>}
 * @param uuid
 */
export async function getUserWorkspaces() {
  const url = `${apiUrl()}/workspaces`;

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()
    }
  }).then(checkResponse);
}
