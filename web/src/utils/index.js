import axios from 'axios'

const apiPre = 'http://nightapi.xtzero.me/index.php/'
export function ajax(url, params) {
    let _url = []
    for(let i = 0; i < params.length; i ++) {
        _url.push(i + '=' + params[i])
    }
    const sendUrl = apiPre + url + '?' + _url.join('&')

    return axios.get(sendUrl)
}