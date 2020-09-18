import request from '../utils/request';
import qs from 'qs'

// 获取消费历史
export function getMessagePayHistory () {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/moenyLog',
        // data: qs.stringify(data)
    })
}