<template>
    <div class="index">
        <screen></screen>
    </div>
    
</template>

<script>

import screen from '@/views/screen/Index';
export default {
    name: 'index',
    components: { 
        screen 
    },

};
</script>

<style lang="stylus" scoped>

.index
    width 1rem
    height 1rem
    font-size 0.3rem

    
</style>