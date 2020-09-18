import axios from 'axios';
import {
    getCookie,
    refreshToken
} from './cookie';
import {
    MessageBox
} from 'mint-ui'
console.log(process.env.VUE_APP_BASE_API)
var service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        if(getCookie('token')) config.headers['Authorization'] = 'Bearer ' + getCookie('token');
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status
     * Please return  response => response
     */
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        var res = response.data
        if (res.code !== 0) {
            if (res.code === 110113 || res.code === 110110 || res.code === 110111 || res.code === 110112) {
                refreshToken();
            } else {  
                MessageBox({
                    title: '提示',
                    message: res.data.message || 'error',
                    showCancelButton: true
                })
            }
            return Promise.reject(res.message || 'error')
        } else {
            return res
        }
    },
    error => {      
        // const erro = error.response
        console.log(error); // for debug
        const erro = error.response
        console.log(erro)
        if (erro.data.code === 110113 || erro.data.code === 110110 || erro.data.code === 110111 || erro.data.code === 110112) {
            refreshToken();
        } else {
            MessageBox({
                title: '错误提示',
                message: erro.data.message || 'error',
                showCancelButton: true
            })
            console.log('err' + error) // for debug
        }
        
        
        return Promise.reject(error)   
    }
)

export default service