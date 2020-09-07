import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getRecommend() {

    //配置data 拼接的参数
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}


