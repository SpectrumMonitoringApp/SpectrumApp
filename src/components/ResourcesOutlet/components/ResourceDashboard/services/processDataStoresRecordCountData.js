import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../services/apiUrl';

/**
 * Get data about records count in data stores
 * @param workspaceId
 * @param resourceId
 * @param dataStoreIds
 * @returns {Promise<Promise>}
 */
export async function processDataStoresRecordCountData(workspaceId, resourceId, dataStoreIds) {
  const url = new URL(`${apiUrl()}/resources/${resourceId}/influx-db/record-count`);

  if (workspaceId) url.searchParams.set('workspaceId', workspaceId);

  if (dataStoreIds) url.searchParams.set('dataStoreIds', JSON.stringify(dataStoreIds));

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()
    }
  }).then(checkResponse);
}