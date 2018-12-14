import { Platform } from 'react-native';

let apiVersion = '1';
let apiUrl = 'http://www.taptrust.com/api/' + apiVersion + '/';

const defaultSettings = {
    url: '',
    payload: {},
    body: {},
    method: 'GET',
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
    settings.method = settings.method.toUpperCase();

    const fetchOptions = {
        method: settings.method,
    };

    if (Object.keys(settings.payload).length > 0) {
            url += getQuery(settings.payload);
    }
    
    if (Object.keys(settings.body).length > 0) {
            fetchOptions.headers =  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
            fetchOptions.body = JSON.stringify(settings.body);
    }
        
    

    console.log('Sending request to url ' + url, fetchOptions);
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions).then(response => {
            if (response.status === 200 || response.status === 202 || response.status === 406 ) {
                response.json().then(json => resolve(json));
            } else {
                const e = new Error('Error making network request to url: ' + url);
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
                    console.log("error response for url: " + url, response);
                    reject(e);
                    throw e;
                }
            }
        });
    });
};

export default fetchApi;
