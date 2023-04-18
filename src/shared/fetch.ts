import queryString from "query-string";

export function get<Params extends unknown, Response>(
    url: string,
    params?: Params,
    options?: RequestInit
) {
    const query = params && queryString.stringify(params);
    const fetchUrl = url + (query ? `?${query}` : '');
    return fetch(fetchUrl, options)
        .then(
            res => {
                if (!res.ok) {
                    throw res;
                }
                return res.json()
            })
        .then(({data}) => data as Response)
}

export async function post<Payload extends Record<string, any>, Response>(url: string, payload: Payload, options?: RequestInit) {
    const {headers} = options ?? {};
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...options,
    })
    .then(
        res => {
            if (!res.ok) {
                throw res;
            }
            return res.json()
        })
    .then(({data}) => data as Response)
}

export async function doDelete<Params extends Record<string, any>, Response>(url: string, params?: Params, options?: RequestInit) {
    const query = params && queryString.stringify(params);
    const fetchUrl = url + (query ? `?${query}` : '');
    return fetch(fetchUrl, {
        method: 'DELETE',
        ...options,
    })
    .then(
        res => {
            if (!res.ok) {
                throw res;
            }
            return res.json()
        })
    .then(({data}) => data as Response)
}