<template>
    <div>
        <!-- 导航栏 -->
       <common-title :title="title"></common-title>
        <!-- 头部 -->
        <Header :messageCount='messageCount'></Header>
        <!-- 主体 -->
        <Main :arrItem='arrItem' :sendMessageData='sendMessageData' :InfoMoRen='InfoMoRen'></Main>
        <!-- 底部 -->
        <Footer :userNumber='userNumber' :messageCount='messageCount' :sendMessageData='sendMessageData'></Footer>
    </div>
</template>

<script>
import { getMessageTemplate } from '@/api/messageTemplate';

import CommonTitle from '@/components/CommonTitle'
import Header from './modules/Header'
import Footer from './modules/Footer'
import Main from './modules/Main'

export default {
    name: 'send',
    components: {
        CommonTitle,
        Header,
        Footer,
        Main
    },
    data () {
        return {
            title: '唤醒合伙人',
            arrItem:[],  
            sendMessageData: {},      
            messageCount: '',  // 短信剩余条数  
            userNumber: '',  // 用户数量   
            templateId: '',  // 模板id
            InfoMoRen: '',  // 下面字默认显示
        }
    },

    methods: {

        // 获取模板数据
        getMessageTemplateList () {
            getMessageTemplate().then(res => {
                this.arrItem = res.data.template;  
                this.InfoMoRen = this.arrItem[0].title;      
                this.sendMessageData.template_id = this.arrItem[0].id; 
                this.messageCount = res.data.moeny;
            })
        },
    },

    created() {
        // 获取数据
        this.getMessageTemplateList();
        
    },

    mounted () {
        this.sendMessageData = this.$route.query;
        this.userNumber = this.$route.query.userNum;
    },
}
</script>

<style lang="stylus" scoped>

</style>