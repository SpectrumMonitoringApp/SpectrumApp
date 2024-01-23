import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Create workspace for current user by name
 * @param workspaceName
 * @returns {Promise<Response>}
 */
export async function handleWorkspaceCreate(workspaceName) {
  const url = `${apiUrl()}/workspaces`;
  const payload = {
    name: workspaceName
  };

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
