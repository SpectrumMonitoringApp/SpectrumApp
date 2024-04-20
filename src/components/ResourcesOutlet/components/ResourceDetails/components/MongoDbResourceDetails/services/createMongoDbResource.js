import { apiUrl, getStandardHeaders, checkResponse, getAuthorizationHeaders } from '../../../../../../../services/apiUrl';

/**
 * Create a new MongoDb resource
 * @param mongoDbResource
 * @returns {Promise<Promise>}
 */
export async function createMongoDbResource(mongoDbResource) {
  const url = `${apiUrl()}/resources/mongo-db`;

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...getStandardHeaders(),
      ...getAuthorizationHeaders()

    },
    body: JSON.stringify(mongoDbResource)
  }).then(checkResponse);
}
