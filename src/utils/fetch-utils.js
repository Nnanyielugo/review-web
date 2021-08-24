import config from 'config';
import isString from 'lodash/isString';

function getBody(response) {
  if (response.headers) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    }
    return response.text();
  }
  return response;
}

class FetchError {
  constructor(response, body) {
    const { message, error } = body.error;
    const errorMessage = 'There was an error processing your request';

    this.name = error.name || 'Fetch Error';
    this.status = response.status || error.status;
    this.message = message || errorMessage;
    this.errorCode = error.status;
    this.body = body;
  }
}

FetchError.prototype = Error.prototype;

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  return getBody(response).then((body) => {
    throw new FetchError(response, body);
  });
}

let authStore;

// eslint-disable-next-line no-return-assign
export const setAuthStore = (newStore) => {
  authStore = newStore;
};

const setHeadersFromStore = () => {
  const headers = {};
  const authUser = authStore || null;
  const localAuth = JSON.parse(localStorage.getItem('auth'));
  console.log('auths', authUser, localAuth);

  if (authUser && authUser.token) {
    headers.Authorization = `Bearer ${authUser.token}`;
  }

  if (localAuth && localAuth.token) {
    headers.Authorization = `Bearer ${localAuth.token}`;
  }
  return headers;
};

/**
 * Wrapper around standard Fetch function, it parses JSON and handles errors.
 * @param url {String} Standard Fetch url arg
 * @param options { { Request.init..., returnWholeResponse: boolean } }
 * @param type {String} Expected data type for options.body
 * @returns {Promise.<*>}
 */
export default async (url, options = {}, type = 'json') => {
  try {
    let { body, headers } = options;
    const { returnWholeResponse } = options;
    if (!isString(url)) {
      throw new Error(
        "Fetch wrapper requires a 'url' property that is a string"
      );
    }
    if (url.indexOf('http') !== 0) {
      //  eslint-disable-next-line no-param-reassign
      url = config.apiEndpoint + url;
    }
    if (type === 'json') {
      body = JSON.stringify(body);
    }

    headers = {
      ...setHeadersFromStore(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    console.log('headers', headers);

    //  eslint-disable-next-line no-param-reassign
    options = {
      ...options,
      body,
      headers,
    };

    let response = await fetch(url, options);
    response = checkResponseStatus(response);
    if (returnWholeResponse) {
      return response;
    }
    return await getBody(response);
  } catch (err) {
    console.warn(err);
    throw err;
  }
};
