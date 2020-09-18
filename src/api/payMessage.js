import request from '../utils/request';
import qs from 'qs'

// 获取支付选择信息
export function getMessagePayInfo () {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/getSms',
        // data: qs.stringify(data)
    })
}

// 支付 充值
export function payMessageEmit (data) {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/recharge',
        data: qs.stringify(data)
    })
}
