import queryString from 'query-string';

const QIANFAN_API_KEY = 'qNGzHNciu6ubGfZAvXFdEEBq';
const QIANFAN_API_SECRET = 'u5FGNwqkNiswnx5lX0W7U44TiG9chlpY';

export async function getYiyanToken() {
    const params = queryString.stringify({
        grant_type: 'client_credentials',
        client_id: QIANFAN_API_KEY,
        client_secret: QIANFAN_API_SECRET,
    });
    const data = await fetch(`https://aip.baidubce.com/oauth/2.0/token?${params}`).then(res => res.json());
    const {access_token} = data;
    return {accessToken: access_token};
}
