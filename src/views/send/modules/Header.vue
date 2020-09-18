<template>
    <div class="Header">
        <!-- Header -->
        <div class="flex alignCenter" :class="{'header': andriod, 'headerIphone': iphonex, 'headerIphone8': iphone8pHeader}">
            <div class="headerLeft">
                <div class="headerLeftTop">
                    <span class="headerLeftSpanLeft">短信剩余条数&nbsp;:&nbsp;&nbsp;<span>{{ parseInt(messageCount) }}</span></span>
                </div>
                <div class="headerLeftBottom" @click="jumpHistoryEmit">
                    <span>消费记录 > </span>
                </div>
            </div>
            <div class="headerRight flex alignCenter justifyCenter" @click="jumpPayEmit">
                <span>购买短信</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: ['messageCount'],
    data() {
        return{
            andriod: true,
            iphonex: false,
            iphone8p: false,
            andriodHeader: true,
            iphonexHeader: false, 
            iphone8pHeader: false,
        }
    },

    methods: {
        // 跳转到消费记录事件
        jumpHistoryEmit() {
            this.$router.push('/history');
        },

         // 跳转充值事件
        jumpPayEmit() {
            this.$router.push('/pay')
        },

    },

    created() {
        if(this.$t.ioscheck()) {
            if (this.$t.isIphoneX() || this.$t.isIPhoneXR()) {
                this.iphonex = true;
                this.andriod = false;
                this.iphone8p = false;
                this.iphone8pHeader = false;
            } else if (this.$t.isIpone8plus() || this.$t.isIphone7()) {
                this.iphonex = false;
                this.andriod = false;
                this.iphone8p = true;
                this.iphone8pHeader = true;
            } else {
                this.andriodHeader = true;
                this.iphonexHeader = false;
                this.iphone8p = false;
                this.iphone8pHeader = false;
            }
        } else {
            this.andriodHeader = true;
            this.iphonexHeader = false;
            this.iphone8p = false;
            this.iphone8pHeader = false;  
        }
    }
}
</script>

<style lang="stylus" scoped>
.header
    height 1.7rem
    margin-top 0.88rem
    width 100%
    border-top: 0.01rem solid #f2f2f2
    .headerLeft
        margin-left 0.3rem
        .headerLeftTop
            margin-bottom 0.3rem
            .headerLeftSpanLeft
                font-size $commonFont
                color #333333
                span
                    color #ff4c22
                    font-size 0.3rem
        .headerLeftBottom
            span
                font-size 0.22rem
                color #333333    
    .headerRight   
        width 1.8rem
        height 0.58rem
        background #FF4C22
        border-radius 0.3rem
        position absolute 
        right 0.3rem
        span    
            color #FFFFFF
            font-size $commonFont 
.headerIphone
    height 1.7rem
    margin-top 1.88rem
    width 100%
    border-top: 0.01rem solid #f2f2f2
    .headerLeft
        margin-left 0.3rem
        .headerLeftTop
            margin-bottom 0.3rem
            .headerLeftSpanLeft
                font-size $commonFont
                color #333333
                span
                    color #ff4c22
                    font-size 0.3rem
        .headerLeftBottom
            span
                font-size 0.22rem
                color #333333    
    .headerRight   
        width 1.8rem
        height 0.58rem
        background #FF4C22
        border-radius 0.3rem
        position absolute 
        right 0.3rem
        span    
            color #FFFFFF
            font-size $commonFont 
.headerIphone8
    height 1.7rem
    margin-top 1.28rem
    width 100%
    border-top: 0.01rem solid #f2f2f2
    .headerLeft
        margin-left 0.3rem
        .headerLeftTop
            margin-bottom 0.3rem
            .headerLeftSpanLeft
                font-size $commonFont
                color #333333
                span
                    color #ff4c22
                    font-size 0.3rem
        .headerLeftBottom
            span
                font-size 0.22rem
                color #333333    
    .headerRight   
        width 1.8rem
        height 0.58rem
        background #FF4C22
        border-radius 0.3rem
        position absolute 
        right 0.3rem
        span    
            color #FFFFFF
            font-size $commonFont 


</style>