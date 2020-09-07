import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        //第三个参数 回调函数
        originJSONP(url, option, (err, data) => {
            if (!err) {
                //成功
                resolve(data)
            } else {
                //失败
                reject(err)
            }
        })
    })
}

function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}