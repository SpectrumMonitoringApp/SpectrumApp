/**
 * workspaceId LocalStorage key
 */
export const workspaceIdLocalStorageKey = 'workspaceId';

/**
 * Set selected workspace
 * @param workspaceId
 */
export function handleWorkspaceSelect(workspaceId) {
  localStorage.setItem(workspaceIdLocalStorageKey, workspaceId);
}

/**
 * Remove selected workspace
 */
export function clearSelectedWorkspace() {
  localStorage.removeItem(workspaceIdLocalStorageKey);
}
