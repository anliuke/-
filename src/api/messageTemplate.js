import request from '../utils/request';
import qs from 'qs'
export function getMessageTemplate () {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/getTemplate',
        // data: qs.stringify(data)
    })
}

export function sendMessage (data) {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/sendBatchSms',
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data)
    })
}


