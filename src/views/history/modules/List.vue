<template>
    <div class="List">
        <!-- 无数据 -->
        <div v-if="historyList == ''" class="notHistory flex justifyCenter alignCenter">
            <div class="notHistory_top">
                <img src="../../../assets/img/images/consumeHistory.png" alt="">
                <div class="notHistory_bototm">   
                    <span>您还没有消费记录~</span>
                </div>
            </div>
        </div>

        <!-- 有数据 -->
        <ul class="historyMain" v-else :class="{'historyMain': andriodStatus,'historyMain-phone': phoneStaus, 'historyMain-phone8': phone8HeaderStaus}">
            <li v-for="item in historyList" :key="item.id" class="flex justifyBetween alignCenter mainInner_item">
                <div>
                    <div class="mainInner_left_top">
                        <span>{{ item.title}}</span>
                    </div>
                    <div  class="mainInner_left_bottom">
                        <span>{{ item.created_at }}</span>
                    </div>
                </div>
                <div class="mainInner_right">
                    <div class="mainInner_right_top  flex flexRight" v-if="item.title == '支付宝购买'">
                        <span>{{ item.remark }}</span>
                    </div>
                    <div class="mainInner_right_top  flex flexRight" v-else-if="item.title == '2号钱包购买'">
                        <span>{{ item.remark }}</span>
                    </div>
                    <div class="mainInner_right_top_else  flex flexRight" v-else>
                        <span>{{ item.remark }}</span>
                    </div>
                    <div class="mainInner_right_bottom flex flexRight">
                        <span v-if="item.type == 1">短信条数:  +{{ item.change_amount }}</span>
                        <span v-else-if="item.type == 0">短信条数:  -{{ item.change_amount }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: ['historyList'],
    data() {
        return{
            andriodStatus: true,
            phoneStaus: false,
            phone8HeaderStaus: true,
            phone8Staus: false,
        }
    },

    methods: {

    },

    created() { 
        if(this.$t.ioscheck()){
            if(this.$t.isIphoneX() || this.$t.isIPhoneXR()){
                // console.log(10);
                this.andriodStatus = false;
                this.phoneStaus = true;
                this.phone8HeaderStaus = false;
                this.phone8Staus = false;
            } else if (this.$t.isIpone8plus() || this.$t.isIphone7()) {
                this.andriodStatus = false;
                this.phoneStaus = false;
                this.phone8HeaderStaus = true;
                this.phone8Staus = true;
            } else {
                this.andriodStatus = true;
                this.phoneStaus = false;
                this.phone8HeaderStaus = false;
                this.phone8Staus = false;
            }
        } else {
            this.andriodStatus = true;
            this.phoneStaus = false;
            this.phone8HeaderStaus = false;
            this.phone8Staus = false;
        }
    }
}
</script>

<style lang="stylus" scoped>
.notHistory
    width 100%
    min-height 13.5rem
    background #f6f6f6
    .notHistory_top
        width 2.37rem
        height 2.06rem
        img
            width 100%
            height 100% 
    .notHistory_bototm
        margin-top 0.42rem
        span 
            color #999999
            font-size 0.26rem
.historyMain 
    background #FFFFFF
    width 100%
    margin-top 1.08rem
    background #FFFFFF
    .mainInner_item
        height 1.2rem    
        margin: 0 0.3rem;
        div
            .mainInner_left_top
                span 
                    color #333333
                    font-size 0.3rem
            .mainInner_left_bottom
                margin-top 0.2rem   
                span    
                    color #999999
                    font-size 0.22rem
        .mainInner_right
            .mainInner_right_top
                span
                    color #FF4C21
                    font-size 0.3rem
            .mainInner_right_top_else
                span
                    color #999999
                    font-size 0.24rem
            .mainInner_right_bottom
                margin-top 0.13rem
                span 
                    color #333333
                    font-size 0.24rem  
.historyMain-phone 
    background #FFFFFF
    width 100%
    margin-top 2.08rem
    background #FFFFFF
    .mainInner_item
        height 1.2rem    
        margin: 0 0.3rem;
        div
            .mainInner_left_top
                span 
                    color #333333
                    font-size 0.3rem
            .mainInner_left_bottom
                margin-top 0.2rem   
                span    
                    color #999999
                    font-size 0.22rem
        .mainInner_right
            .mainInner_right_top
                span
                    color #FF4C21
                    font-size 0.3rem
            .mainInner_right_top_else
                span
                    color #999999
                    font-size 0.24rem
            .mainInner_right_bottom
                margin-top 0.13rem
                span 
                    color #333333
                    font-size 0.24rem   

.historyMain-phone8 
    background #FFFFFF
    width 100%
    margin-top 1.48rem
    background #FFFFFF
    .mainInner_item
        height 1.2rem    
        margin: 0 0.3rem;
        div
            .mainInner_left_top
                span 
                    color #333333
                    font-size 0.3rem
            .mainInner_left_bottom
                margin-top 0.2rem   
                span    
                    color #999999
                    font-size 0.22rem
        .mainInner_right
            .mainInner_right_top
                span
                    color #FF4C21
                    font-size 0.3rem
            .mainInner_right_top_else
                span
                    color #999999
                    font-size 0.24rem
            .mainInner_right_bottom
                margin-top 0.13rem
                span 
                    color #333333
                    font-size 0.24rem  
</style>