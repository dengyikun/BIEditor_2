import fetch from 'dva/fetch';

const parseJSON = (response) => {
  return response.json();
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const request = (type, url, data, urlParams, headers, options) => {
  let fetchOpt = {
    method: type,
    headers: {
      'Accept': 'application/json',
      ...headers
    },
    ...options,
  }

  if (data instanceof FormData) {
    fetchOpt['body'] = data
  } else if (data instanceof Object){
    fetchOpt['body'] = JSON.stringify(data)
    fetchOpt.headers['Content-Type'] = 'application/json'
  }

  if (urlParams instanceof Object) {
    url += url.includes('?') ? '' : '?'
    for (let key in urlParams) {
      let value = urlParams[key]
      if (value || value === false) {
        value = typeof value === 'string' ? value : JSON.stringify(value)
        url += '&' + key + '=' + encodeURIComponent(value)
      }
    }
  }

  return fetch(url, fetchOpt)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}


export default {
  get: (url, urlParams, headers, options) => request('GET', url, null, urlParams, headers, options),
  post: (url, data, urlParams, headers, options) => request('POST', url, data, urlParams, headers, options),
  put: (url, data, urlParams, headers, options) => request('PUT', url, data, urlParams, headers, options),
  delete: (url, urlParams, headers, options) => request('DELETE', url, null, urlParams, headers, options),
  patch: (url, data, urlParams, headers, options) => request('PATCH', url, data, urlParams, headers, options),
}
