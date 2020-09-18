<template>
    <div class="jiaoCheng">
        <!-- 导航栏 -->
        <common-title :title="title"></common-title>
        <img src="../../assets/img/images/jiaoCheng.jpg" :class="{ 'imgClass': andriodStatus, 'imgClass-PhoneX': iphoneStaus, 'imgClass-Phone8':iphone8Staus }"></img>
    </div>
</template>

<script>
import CommonTitle from '@/components/CommonTitle'
export default {
    name: 'jiaoCheng',
    components: {
        CommonTitle
    },
    data() {
        return {
            title: '教程',
            andriodStatus: true,
            iphoneStaus: false,
            iphone8Staus: false,
            iphone8HeaderStaus: false,
        }
    },

    methods: {

    },

    created () {
        if(this.$t.ioscheck()){
            if(this.$t.isIphoneX() || this.$t.isIPhoneXR()){
                this.andriodStatus = false;
                this.iphoneStaus = true;
                this.iphone8Staus = false;
                this.iphone8HeaderStaus = false;
            } else if (this.$t.isIpone8plus() || this.$t.isIphone7()) {
                this.andriodStatus = false;
                this.iphoneStaus = false;
                this.iphone8Staus = true;
                this.iphone8HeaderStaus = true;
            } else {
                this.andriodStatus = true;
                this.iphoneStaus = false;
                this.iphone8Staus = false;
                this.iphone8HeaderStaus = false;
            }
        } else {
            this.andriodStatus = true;
            this.iphoneStaus = false;
            this.iphone8Staus = false;
            this.iphone8HeaderStaus = false;
        }
    },
}
</script>

<style lang="stylus" scoped>
.jiaoCheng
    .imgClass 
        width 100%
        margin-top 0.88rem
    .imgClass-PhoneX
        width 100%
        margin-top 2rem
    .imgClass-Phone8
        width 100%
        margin-top 1.4rem
</style>