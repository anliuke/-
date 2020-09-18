import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes : [
        {
          path : '/',
          meta:{
            name: '筛选页'
          },
          component: () => import ('@/views/screen/Index.vue')
        },
        // {
        //     path : '/screen',
        //     meta:{
        //       name: '筛选页'
        //     },
        //     component: () => import ('@/views/screen/Index.vue')
        // },
        {
            path : '/send',
            meta:{
              name: '短信发送'
            },
            component: () => import ('@/views/send/Index.vue')
        },
        {
            path : '/pay',
            meta:{
              name: '短信购买'
            },
            component: () => import ('@/views/pay/Index.vue')
        },
        {
            path : '/history',
            meta:{
              name: '消费记录'
            },
            component: () => import ('@/views/history/Index.vue')
        },
        {
            path : '/jiaoCheng',
            meta:{
              name: '教程'
            },
            component: () => import ('@/views/jiaoCheng/Index.vue')
        }
    ]
})