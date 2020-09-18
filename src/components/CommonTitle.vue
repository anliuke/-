<template>
    <div class="CommoonHeader">
         <!-- 导航栏 -->
        <div class="flex justifyCenter alignCenter" :class="{'app-title' :andriodStatus, 'app-title-phoneX': phoneStaus, 'app-title-phone8': phone8Staus}">
            <div class="anNiu flex aligCenter">
                <i class="iconfont" @click="close" v-if="title == '短信营销'">&#xe608;</i>
                <i class="iconfont" @click="goBack" v-else>&#xe608;</i>
                <i class="iconfont back" @click="close">&#xe607;</i>
            </div>
            <div class="title">
                <span>{{ title }}</span>
            </div>
            <div class="refresh" @click="jaioChengEmit" v-if="title == '短信营销'">
                <span>教程</span>
            </div>
            <div class="refresh flex aligCenter" @click="refresh" v-else>
                <i class="iconfont">&#xe609;</i>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    name: 'CommoonHeader',
    props: ['title'],
    data () {
        return{
            andriodStatus: true,
            phoneStaus: false,

            phone8HeaderStaus: true,
            phone8Staus: false,
        }
    },

    methods: {

        activated: function () {
            this.$setgoindex()
        },

        // 回退事件
        goBack(){
            console.log('其他页')
            if (this.$route.query.goindex === 'true') {
                this.$router.push('/')
            } else {
                this.$router.back(-1)
            }
        },

        // 关闭事件
        close(){
            console.log('首页')
            if (this.$t.GScheck()) {
                this.$t.GSsdk({
                    type:"close"
                })
            }
        },
        // 刷新页面
        refresh(){
            console.log('其他页')
            if(this.$t.GScheck()){
                this.$t.GSsdk({
                    type:'refresh_page',
                })
            } else {
                    window.location.href = window.location.href; 
            }
        },

        // 首页跳转教程
        jaioChengEmit() {
            this.$router.push('/jiaoCheng');
        },
    },

    created () {
        if(this.$t.ioscheck()){
            if(this.$t.isIphoneX() || this.$t.isIPhoneXR()){
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
/* 兼容公共标题头 -- 普通手机 */
// 导航栏
.app-title
    width 7.5rem
    height 0.88rem
    line-height 0.88rem
    position fixed
    left 50%
    top 0
    margin-left -3.75rem
    z-index 100
    font-size 0.36rem
    color #333333
    background: #FFFFFF
    border-bottom 0.01rem solid #cccccc9c
    .anNiu
        height 100%
        position absolute
        left 0.3rem
        top 0
        .back
            margin-left 0.2rem
    .title
        span
            color #333333
            font-size 0.36rem 
    .refresh
        height 100%
        position absolute
        right 0.3rem
        top 0


/* 兼容公共标题头 -- ipnone7,8 */
.app-title-phone8
    width 7.5rem
    height 0.88rem
    line-height 0.88rem
    position fixed
    left 50%
    top 0rem
    margin-left -3.75rem
    z-index 100
    font-size 0.36rem
    color #333333
    background: #FFFFFF
    padding-top 0.4rem
    border-bottom 0.01rem solid #cccccc9c
    .anNiu
        height 100%
        position absolute
        left 0.3rem
        top 0
        padding-top 0.4rem
        .back
            margin-left 0.2rem
    .title
        span
            color #333333
            font-size 0.36rem 
    .refresh
        height 100%
        position absolute
        right 0.3rem
        top 0
        padding-top 0.4rem
        span 
            font-size 0.28rem


/* 兼容公共标题头 -- ipnoneX, ipnoneXR */
.app-title-phoneX
    width 7.5rem
    height 0.88rem
    line-height 0.88rem
    position fixed
    left 50%
    top 0rem
    margin-left -3.75rem
    z-index 100
    font-size 0.36rem
    color #333333
    background: #FFFFFF
    padding-top 1rem
    border-bottom 0.01rem solid #cccccc9c
    .anNiu
        height 100%
        position absolute
        left 0.3rem
        top 0
        padding-top 1rem
        .back
            margin-left 0.2rem
    .title
        span
            color #333333
            font-size 0.36rem 
    .refresh
        height 100%
        position absolute
        right 0.3rem
        top 0
        padding-top 1rem
</style>