import request from '../utils/request';
import qs from 'qs'

// 获取用户列表
export function getUserList (data) {
    return request({
        method: 'post',
        url: '/gsmanager/consumer/smsAwaken/getAgents',
        data: qs.stringify(data)
    })
}
