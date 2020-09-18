<template>
    <div class="Main">
         <div class="main">
            <div class="mainTop flex alignCenter justifyCenter">
                <span>短信模板</span>
            </div>

            <div class="swiper-container">
                <div class="swiper-wrapper">
                <div class="swiper-slide flex justifyCenter alignCenter" :data-title="item.title" v-for="item in arrItem" :data-id="item.id" :key="item.id">
                    <div class="main_itemInfo">
                        <span>{{item.content}}</span>
                    </div>
                </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
                <!-- Add Arrows -->
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>

            <div class="mainBottom flex alignCenter justifyCenter">
                <span>{{ InfoMoRen }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    props: {
        'arrItem': Array,
        'sendMessageData': Object,
        'InfoMoRen': String
    },
    data() {
        return{

        }
    },

    created() {

    },

    mounted() {
        // 实例化轮播图
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,    
            spaceBetween: 30,
            loop: true,
            freeMode:false,  
            touchRatio:3,  
            longSwipesRatio:0.1,  
            threshold:50,  
            followFinger:false,  
            observer: true,//修改swiper自己或子元素时，自动初始化swiper  
            observeParents: true,//修改swiper的父元素时，自动初始化swiper  
            pagination: {
                el: '.swiper-pagination',
                // clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },               
            on: {
                slideChangeTransitionEnd: () => {
                    if (document.querySelector('.swiper-slide-active') != null) {
                        this.sendMessageData.template_id =  parseInt(document.querySelector('.swiper-slide-active').getAttribute("data-id")); 
                        this.InfoMoRen = document.querySelector('.swiper-slide-active').getAttribute("data-title"); 
                    } 
                }
            },
        });
    }
}
</script>

<style lang="stylus" scoped>
 $commonFont = 0.26rem
// 主体
.main   
    min-height 13rem
    width 100%
    background #F2F3F3
    .mainTop
        height 0.88rem
        padding-left 0.3rem
        span    
            color #333333
            font-size 0.3rem
    .swiper-container
        width: 6.1rem
        min-height: 8rem
        .swiper-slide
            .main_itemInfo
                width 6.1rem
                height 7rem 
                line-height 0.53rem
                background #FFFFFF
                padding 0.47rem 0.44rem 0 0.45rem
                border-radius 0.2rem
                span    
                    color #333333    
                    font-size 0.26rem
        .swiper-pagination
            width 100%
            bottom 0rem
            /deep/.swiper-pagination-bullet-active
                background #FF9E87
    .swiper-button-prev
        background  url('../../../assets/img/images/bannerLeftIcon.png') 
        width 0.32rem
        background-size: 100%
        height: 0.44rem
        margin-top 0rem
        outline none
    .swiper-button-next
        background  url('../../../assets/img/images/bannerRightIcon.png') 
        width 0.32rem
        background-size: 100%
        height: 0.44rem
        margin-top 0rem 
        outline  none
    .mainMain
        .mainMiddle
            width 6.1rem
            height 7rem
            line-height 0.6rem
            background  #FFFFFF 
            border-radius 0.2rem
            .mainMiddleInner 
                margin 0.47rem 0.47rem 0 0.45rem
                span 
                    color #333333
                    font-size $commonFont
        .leftIcon 
            width 0.32rem
            height 0.44rem
            margin-right 0.28rem
            img     
                width 100%
                height 100%
        .rightIcon
            width 0.32rem
            height 0.44rem
            margin-left 0.28rem
            img     
                width 100%
                height 100%
    .mainBottom
        width 100%
        span   
            color #999999
            font-size $commonFont
        
</style>