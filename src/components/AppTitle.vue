<template>
    <div class="app-title flex justifyCenter alignCenter">
        <div class="back">
            <i class="iconfont">&#xe608;</i>
        </div>
        <div class="close">
            <i class="iconfont">&#xe607;</i>
        </div>
        <div class="refresh">
            <i class="iconfont">&#xe609;</i>
        </div>
    </div>
</template>
<script>    
export default {
    name: 'appTitle'
}
</script>
<style lang="stylus" scoped>
.app-title
    width 7.5rem
    height 0.88rem
    position fixed
    left 50%
    top 0
    margin-left -3.75rem
    z-index 100
    font-size 0.36rem
    color #333333
</style>