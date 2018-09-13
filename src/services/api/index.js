import { Platform } from 'react-native';

let apiUrl = 'http://www.taptrust.com/api/1/';

const defaultSettings = {
    url: '',
    payload: {},
    method: 'get',
};

function getQuery (queryParams) {
    let arr = Object.keys(queryParams).map(function (k) {
        return k + '=' + encodeURIComponent(queryParams[k])
    });
    return '?' + arr.join('&');
}

export const fetchApi = (args) => {
    const settings = {
        ...JSON.parse(JSON.stringify(defaultSettings)),
        ...args,
    };

    let url = apiUrl + settings.url;

    const fetchOptions = {
        method: settings.method,
    };

    if (Object.keys(settings.payload).length > 0) {
        if (settings.method === 'post') {
            url += getQuery(settings.payload);
        }
    }

    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions).then(response => {
            if (response.status === 200 || response.status === 202 || response.status === 406 ) {
                response.json().then(json => resolve(json));
            } else {
                const e = new Error('Error making network request');
                e.responseStatus = response.status;

                if (response.status === 422) {
                    response.json().then(json => {
                        e.errors = json.errors ? json.errors : json;
                        reject(e);
                    });
                } else if (response.status === 400) {
                    response.json().then(json => {
                        if (json.error === 'token_invalid') {
                            logout();
                        }
                    });
                } else {
                    console.log("error response", response);
                    reject(e);
                    throw e;
                }
            }
        });
    });
};

export default fetchApi;
