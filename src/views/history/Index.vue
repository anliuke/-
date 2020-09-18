<template>
    <div class="Index">

        <!-- 导航栏 -->
        <common-title :title="title"></common-title>
        <!-- 主体 -->
        <List :historyList='historyList'></List>
    </div>
</template>
      
<script>
import { getMessagePayHistory } from '@/api/messageHistory'
import CommonTitle from '@/components/CommonTitle'
import List from './modules/List'
export default {
    name: 'history',
    components: {
        CommonTitle,
        List
    },
    data () {
        return {
            title: '消费记录',
            historyList: [],
        }
    },  

    methods: {

        // 获取数据
        getHistoryList() {
            getMessagePayHistory().then((res) => {
                if (res.code == 0) {
                    this.historyList = res.data.list;
                }
               
            })
        },
    },

    created () {
        this.getHistoryList();
    },

    // 更改组件背景色   
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#f5f5f5')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
}
</script>

<style lang="stylus" scoped>

</style>