<template>
    <div class="Footer">
        <div class="footer flex justifyBetween">
            <div class="footerLfet">
                <div class="footerLeft_top">
                    <span class="userNum">用户数量 :&nbsp;</span>
                    <span class="numInfo">{{ userNumber }}</span>
                </div>
                <div class="footerRight_bottom">
                    <span>点击【短信唤醒】，让团队不再沉睡</span>
                </div>
            </div>
            <div class="footerRight  flex justifyCenter alignCenter" @click="sendMessageEmit">   
                <div class="footerRight_inner_top">
                    <span>短信唤醒</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import { sendMessage } from '@/api/messageTemplate';
export default {
    name: 'Footer',
    props: [
            'userNumber',
            'messageCount',
            'sendMessageData'
        ],

    data() {
        return{
            
        }
    },

    methods: {
        // 发送短信事件
        sendMessageEmit() {
            if (this.messageCount < this.userNumber) {
                MessageBox.confirm('当前短信剩余条数少于用户数量, 请购买短信').then(action => {
                    this.$router.push('/pay')
                })
                
            } else if ( this.userNumber == 0) {
                MessageBox({
                    title: '提示',
                    message: '当前可发送用户数量不能为 0',
                    showCancelButton: true
                })
            } else {
                sendMessage(this.sendMessageData).then((res) => {
                if (res.code == 0) {
                        MessageBox({
                            title: '提示',
                            message: '发送成功',
                            showCancelButton: true
                        })
                        
                    } 
                })
                this.$parent.getMessageTemplateList();
            }
        },   

    },

    created() {

    }
}
</script>

<style lang="stylus" scoped>
 // 底部
.footer 
    background #FFFFFF 
    width 100%
    height 0.98rem
    position fixed 
    bottom 0
    .footerLfet
        padding-left 0.3rem
        .footerLeft_top
            margin-top 0.16rem
            .userNum
                color #333333
                font-size $commonFont
            .numInfo
                color #FF4C22
                font-size $commonFont
        .footerRight_bottom
            margin-bottom 0.18rem
            span 
                color #999999
                font-size  0.24rem
    .footerRight
        width 2.6rem
        height 100%
        background-color #FF4C22
        .footerRight_inner_top
            span
                color  #FFFFFF
                font-size 0.3rem

</style>