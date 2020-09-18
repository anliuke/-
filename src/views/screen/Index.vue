<template>
    <div id="screen">

        <!-- 导航栏 -->
        <common-title :title='title'></common-title>

        <!-- 头部 -->
        <div class=" alignCenter flex" :class="{'header': isAppHeader, 'header-IphoneX': isIphoneHeader, 'header-Iphone8P': isIphone8PHeader}">   
            <div class="headerLeft" @click="termEmit">
                <span :class="{'weiSelectStatus': tiaoJianWeiClass, 'selectedStatus': tiaoJianYiClass}">{{ shaiXuanTiaoJianMo }}</span>
                <img :src="tiaoJianWeiClass == true && tiaoJianYiClass == false ? tiaoJianWeiImg : tiaoJianYiImg" alt="">
            </div>
            <div class="headerMiddle alignCenter" @click="timeEmit">
                <span :class="{'weiSelectStatus': timeWeiClass, 'selectedStatus': timeYiClass}">{{ shaiXuanShiJianMo }}</span>
                <img :src="timeWeiClass == true && timeYiClass == false? timeWeiImg : timeYiImg" alt="">
            </div>
            <div class="headerRight flex justifyCenter" @click="selectEmit">
                <span>筛选</span>
            </div>
        </div>
        <div :class="{'empty': isAppHeader, 'emptyIponeX': isIphoneHeader, 'emptyIpone8P': isIphone8PHeader}"></div>
       

        <!-- 主体 无数据-->
        <div class="main alignCenter justifyCenter flex"  @click="closeXuanXiang" v-if="userList == ''" >
            <div class="dnoDataInfo">
                <img src="@/assets/img/images/noData.jpg" alt="" class="noDaTaClass" @click="getToken">
                <div class="noDataWenClass">
                    <span>暂无数据</span>
                </div>
            </div>
        </div>

        <!-- 主体 有数据 -->
        <div class="main_data wrapper" v-show="userList != ''"  ref="wrapper" :style="{height:$height}">

            <div class="main_data_Inner ">
                <div class="mainImg flex justifyCenter" v-show="pullImgStatus">
                    <img src="../../assets/img/images/Tloadding.gif" alt="" >
                </div>
                <li v-for="item in userList" :key="item.id" class="itemInfo flex alignCenter">
                    <img :src="item.headimgurl" alt="" class="img-loadding">
                    <div>   
                        <div class="rightTop flex justifyBetween">
                            <div  class="rightTopLeft"> 
                                <span>{{ item.nickname }}</span>
                            </div>
                            <div class="rightTopRight_2 flex justifyCenter alignCenter" v-if="item.level == 2">
                                <span>二当家</span>
                            </div>
                            <div class="rightTopRight_3 flex justifyCenter alignCenter" v-else-if="item.level == 3">
                                <span>三当家</span>
                            </div>
                        </div>
                        <div class="rightBottom">{{ item.phone }}</div>
                    </div>
                </li>
                <!-- loadding -->
                <div class='loadding-group flex alignCenter justifyCenter'>
                    <img class='loadding loadding-bottom loadding-b' v-if="imgLoading"
                        src='../../assets/img/images/Bloadding2.gif'>
                    <span class="loadding-text">{{loaddingText}}</span>
                </div>
            </div>
            
        </div>
        

        <!-- 底部 -->
        <div class="footer flex justifyBetween">
            <div class="footerLfet">
                <div class="footerLeft_top">
                    <span class="userNum">用户数量 : </span>
                    <span class="numInfo">{{ userNum }}</span>
                </div>
                <div class="footerRight_bottom">
                    <span>自动过滤未设置手机的用户</span>
                </div>
            </div>
            <div class="footerRight flex justifyCenter alignCenter" @click="jumpDuanXinEmit">
                <span>选择短信模板</span>   
            </div>
        </div>


        <!-- 筛选条件选项 -->
        <div v-if="tiaoJianStatus"  :class="{'tiaoJianShaiList': tiaoJianPu, 'tiaoJianShaiListPhonex':  tiaoJianPhone, 'tiaoJianShaiListPhone8p': tiaoJianPhone8p}" ref="tiaoJianRef">
            <ul>
                <li v-for="(item, index) in tiaoJianData" :key="index" class="itemClass  alignCenter justifyCenter flex" @click="addShaiXuanEmit(item, index)">
                    <div class="alignCenter justifyCenter flex tiaoJianMoClass" :class="{'tiaoJianQieClass': isActive === index}">
                        <span>{{ item.content }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 时间筛选选项 -->
        <div v-if="shiJianStatus" :class="{'shiJianList': shiJianPu, 'shiJianListPhonex': shiJianPhone, 'shiJianListPhone8p': shiJianIphone8P}" ref="shiJianRef">  
            <ul>
                <li v-for="(item, index) in timeShaiData" :key="index" class="itemClass  alignCenter justifyCenter flex" @click="addShiJianEmit(item, index)">
                    <div class="alignCenter justifyCenter flex tiaoJianMoClass" :class="{'tiaoJianQieClass': isActiveTime === index}">
                        <span>{{ item.content }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="loadding">
            <img src="" alt="">
        </div>


    </div>
</template>



<script>
import { getUserList } from '@/api/userList';
import { MessageBox } from 'mint-ui';
// import IndexVue from '../history/Index.vue';
import BScroll from 'better-scroll';
// import refreshToken from '@/utils/cookie';
import CommonTitle from '@/components/CommonTitle'

export default {
    name: 'screen',
    components: {
        CommonTitle
    },
    data () {
        return {
            title: '短信营销',
            flag_tiaoJian: 1,  // 判断菜单栏有无被点击
            flag_shiJian: 1,  // 判断菜单栏有无被点击

            isApp: true,
            isAppIphone: false,
            isAppIphone8: false,
            isAppHeader: true,
            isIphoneHeader: false,
            isIphone8PHeader: false,

            tiaoJianPu: true,
            tiaoJianPhone: false,
            tiaoJianPhone8p: false,
            shiJianPu: true,
            shiJianPhone: false, 
            shiJianIphone8P: false,

            shaiXuanTiaoJianMo: '筛选条件',
            shaiXuanShiJianMo: '筛选时间',
            tiaoJianWeiClass: true,  // 条件筛选默认未选中样式
            tiaoJianYiClass: false, // 条件筛选默认已选中样式
            timeWeiClass: true,  // 时间筛选默认未选中样式
            timeYiClass: false, // 时间筛选默认已选中样式

            tiaoJianWeiImg: require('@/assets/img/images/weiCheckIcon.png'),  // 条件未选中使用的图片
            tiaoJianYiImg: require('@/assets/img/images/checkedIcon.png'),  // 条件已选中使用的图片
            timeWeiImg: require('@/assets/img/images/weiCheckIcon.png'),  // 时间未选中使用的图片
            timeYiImg: require('@/assets/img/images/checkedIcon.png'),  // 时间已选中使用的图片

            isActive: '',  //条件筛选选项需要的字段
            isActiveTime: '',  // 时间筛选选项需要的字段
            userList: [],  // 用户信息列表  
            tiaoJianData: [  // 条件筛选信息
                { id: 0, content: '所有用户' },
                { id: 4, content: '新增合伙人' },
                { id: 1, content: '有登陆用户' },
                { id: 2, content: '未登录用户' },
                { id: 3, content: '有订单用户'}
            ], 

            timeShaiData: [  // 时间筛选信息
                { id: 6, content: '1天' },
                { id: 7, content: '2天' },
                { id: 8, content: '3天' },
                { id: 0, content: '7天' },
                { id: 1, content: '15天' },
                { id: 2, content: '30天' },
                { id: 3, content: '60天'},
                { id: 4, content: '90天' },
                { id: 5, content: '180天' }
            ],

            page: 1,
            size: 15,
            type: '',
            time_type: '',
            allLoaded: false,
            imgLoading: true,
            loaddingText: '正在加载...',
            userNum: 0,

            tiaoJianStatus: false,
            shiJianStatus: false,
            pullImgStatus: false,  // 下拉时loading加载
            count: 1, 
            isScroll: true,
            flag: false,
            tiaoJianMo: '',

        }
    },

    methods: {
        
        getToken() {
            this.$t.GSsdk({
                type:"refresh_token",
                url:window.location.href
            })
        },

        // 获取数据
        
         getUserListEmit(isCheck) {
            this.$t.showLoadding(); 

            getUserList({
                page: this.page,
                size: this.size,
                type: isCheck == '' ? '' : this.type,
                time_type: isCheck == '' ? '' : this.time_type,
            }).then(res => {
                this.userNum = 0;
                this.$t.hideLoadding();
                if (res.data.list.length < 15) {
                    this.loaddingText = '没有更多了';
                    this.imgLoading = false;
                } else {
                    this.loaddingText = '正在加载...';
                    this.imgLoading = true;
                }
                if (this.page == 1) {
                    this.userList = res.data.list;
                } else {
                    this.scroll.finishPullUp()
                    this.userList = this.userList.concat(res.data.list);
                }
                this.$nextTick(() => {
                    if(this.scroll){
                        this.page === 1 && this.scroll.finishPullDown()
                        this.scroll.refresh()
                    }else{
                        this.initScroll()
                    }
                })
                this.userNum = res.data.count;
                
            })
        },



        // 点击条件筛选事件
        termEmit () {
            if (this.shiJianStatus == true) {
                return
            }
            this.tiaoJianStatus = true;
            if (this.tiaoJianWeiClass == false) {
                this.tiaoJianWeiClass = true;
            } else if (this.tiaoJianWeiClass == true) {
                console.log('faa')
                this.tiaoJianWeiClass = false;
                this.tiaoJianYiClass = true; 
            }

            this.timeShaiData = [];

            this.tiaoJianData = [  // 条件筛选信息
                { id: 0, content: '所有用户' },
                { id: 4, content: '新增合伙人' },
                { id: 1, content: '有登陆用户' },
                { id: 2, content: '未登录用户' },
                { id: 3, content: '有订单用户'}
            ]
        },


        // 点击时间筛选事件
        timeEmit () {

            if (this.shaiXuanTiaoJianMo == '所有用户') {
                MessageBox({
                    title: '提示',
                    message: '选择所有用户, 不可选择时间',
                    showCancelButton: true
                })
                return 
            }

            if (this.tiaoJianStatus == true) {
                return
            }

            // 判断当前是否选中状态
            this.shiJianStatus = true;

            if (this.shaiXuanTiaoJianMo == '筛选条件') {
                this.shiJianStatus = false;
                MessageBox({
                    title: '提示',
                    message: '请选择筛选条件',
                    showCancelButton: true
                })
            } else {
                this.timeYiClass = true;
                if (this.timeWeiClass == false) {
                    this.timeWeiClass = true;
                    this.shiJianStatus = true;
                } else if (this.timeWeiClass == true) {
                    this.timeWeiClass = false;
                    this.timeYiClass = true;
                    this.shiJianStatus = true;
                }

            }
        },

        // 点击条件筛选事件
        addShaiXuanEmit (item, index) {
            this.type = '';
            this.isActive = index;
            this.shaiXuanTiaoJianMo = item.content;
            // this.tiaoJianMo = this.shaiXuanTiaoJianMo;
            this.type = item.id;

             if (item.content == '所有用户') {
                this.timeShaiData = [];
                this.shaiXuanShiJianMo = '筛选时间';
                this.timeWeiClass = true;
                this.timeYiClass = false;
               
            } else {
                this.timeShaiData = [];
                this.timeShaiData.push(
                    { id: 6, content: '1天' },
                    { id: 7, content: '2天' },
                    { id: 8, content: '3天' },
                    { id: 0, content: '7天' },
                    { id: 1, content: '15天' },
                    { id: 2, content: '30天' },
                    { id: 3, content: '60天'},
                    { id: 4, content: '90天' },
                    { id: 5, content: '180天' }
                )
                this.shaiXuanShiJianMo = '筛选时间';
                this.timeWeiClass = true;
                this.timeYiClass = false;
            }

            if (item.content == '有订单用户') {
                this.timeShaiData.pop();
            } else {
                if (this.timeShaiData.length == 5) {
                    this.timeShaiData.push({
                        id:5, content: '180天'
                    })
                }
            }
            if (this.shaiXuanTiaoJianMo != '') {
                this.tiaoJianWeiClass = false;
                this.tiaoJianYiClass = true;
            } 
            this.tiaoJianStatus = false;
        },

        // 点击时间筛选事件
        addShiJianEmit (item, index) {
            // this.count = 1;
            this.time_type = '';
            this.isActiveTime = index;
            this.shaiXuanShiJianMo = item.content;
            this.time_type = item.id;

            this.tiaoJianData = [
                { id: 0, content: '所有用户' },
                { id: 4, content: '新增合伙人' },
                { id: 1, content: '有登陆用户' },
                { id: 2, content: '未登录用户' },
                { id: 3, content: '有订单用户'}
            ]

            if (item.content == '180天' || this.tiaoJianData[4].content == '有订单用户') {
                this.tiaoJianData.pop();
            } 
            if (item.content != '时间筛选' || this.tiaoJianData[0].content == '所有用户') {
                this.tiaoJianData.shift();
            } else {
                this.tiaoJianData.unshift({
                    id: 0, content: '所有用户'
                });
            }

            if (this.shaiXuanShiJianMo != '') {
                this.timeYiClass = true;
                this.timeWeiClass = false;
            }   
            this.shiJianStatus = false;
        },

        // 点击主体关闭选项卡
        closeXuanXiang() {

        },

         // 筛选事件
        selectEmit() {
            this.page = 1;
            if (this.shaiXuanTiaoJianMo == '筛选条件' && this.shaiXuanShiJianMo == '筛选时间') {
                MessageBox({
                    title: '提示',
                    message: '请选择筛选条件',
                    showCancelButton: true
                })
            } else if (this.shaiXuanTiaoJianMo == '所有用户') {
                this.$t.showLoadding();
                this.getUserListEmit(); 
                this.count++;
            } else if ((this.type != '' || this.type != 0 )&& this.shaiXuanShiJianMo == '筛选时间') {
                MessageBox({
                    title: '提示',
                    message: '请选择筛选时间',
                    showCancelButton: true
                })
            } else if (this.shaiXuanTiaoJianMo != '' && this.shaiXuanShiJianMo != '') {
                this.$t.showLoadding();
                this.getUserListEmit();
                this.count++;
            }

        },

        
        // 跳转到短信模板页面
        jumpDuanXinEmit () {
            this.$router.push({
                path:"/send",
                query:{
                    page: this.page,
                    size: this.userNum >= 15 ? this.size : this.userNum,
                    type: this.type,
                    time_type: this.time_type,     
                    userNum: this.userNum,
                }
            });
        },

        // 初始化scroll 
        initScroll () {
            this.scroll = new BScroll(this.$refs.wrapper, {
                pullDownRefresh: {
                    threshold: 20,
                    stop: 10
                },
                click: true,
                pullUpLoad: {
                    threshold: -30
                }
            })
            this.scroll.on('pullingDown', () => {
                this.page = 1;
                this.loaddingText = '正在加载...'
                if ((this.shaiXuanTiaoJianMo != '所有用户' && this.shaiXuanShiJianMo == '筛选时间' ) || this.count == 2) {
                    var isCheck = '';
                    this.getUserListEmit(isCheck)
                } else {
                    this.getUserListEmit()
                }
            })
            this.scroll.on('pullingUp', () => {
                this.page += 1
                this.getUserListEmit()
            })
            
            this.scroll.on('scrollStart', () => {
                this.pullImgStatus = true;
            })
            
             this.scroll.on('scrollEnd', () => {
                this.pullImgStatus = false;
            })
        },
    },

    computed: {

        $height () {
            
            if (this.$t.isIpone8plus() || this.$t.isIphoneX() || this.$t.isIPhoneXR()) {
                return parseInt(window.innerHeight)/50-4.88+'rem'
            } else {
                return parseInt(window.innerHeight)/50-2.88+'rem'
            }
            
        },

    },

    created () {
    //    this.getUserListEmit();   
        if(this.$t.ioscheck()){
            if(this.$t.isIphoneX() || this.$t.isIPhoneXR()){
                this.isApp = false;
                this.tiaoJianPu = false;
                this.shiJianPu = false;
                this.isAppHeader = false;
  
                this.isAppIphone = true;
                this.shiJianPhone = true;
                this.isIphoneHeader = true;
                this.tiaoJianPhone = true;

                this.isAppIphone8 = false;
                this.isIphone8PHeader = false;
                this.tiaoJianPhone8p = false;
                this.shiJianIphone8P = false;

            } else if (this.$t.isIpone8plus() || this.$t.isIphone7()) {
                this.shiJianPu = false;
                this.isApp = false;  
                this.isAppHeader = false;
                this.tiaoJianPu = false;

                this.isAppIphone = false;
                this.tiaoJianPhone = false;
                this.shiJianPhone = false;
                this.isIphoneHeader = false;

                
                this.isAppIphone8 = true;
                this.isIphone8PHeader = true;
                this.tiaoJianPhone8p = true;
                this.shiJianIphone8P = true;

            } else {
                this.isApp = true;
                this.isAppHeader = true;
                this.tiaoJianPu = true;
                this.shiJianPu = true;

                this.isAppIphone = false;
                this.isIphoneHeader = false;
                this.tiaoJianPhone = false;
                this.shiJianPhone = false;

                this.isAppIphone8 = false;
                this.isIphone8PHeader = false;
                this.tiaoJianPhone8p = false;
                this.shiJianIphone8P = false;
                }
        } else {
            this.isApp = true;
            this.isAppHeader = true;
            this.tiaoJianPu = true;
            this.shiJianPu = true;

            this.isAppIphone = false;
            this.isIphoneHeader = false;
            this.tiaoJianPhone = false;
            this.shiJianPhone = false;

            this.isAppIphone8 = false;
            this.isIphone8PHeader = false;
            this.tiaoJianPhone8p = false;
            this.shiJianIphone8P = false;
            
        }
       
    },
    mounted () {
        
    },

    beforeUpdate() {
        
    },


}
</script>

<style lang="stylus" scoped>

    // 自定义变量
    $headerHeight = 1rem
    $commonFontSize = 0.28rem

     // 头部
    .header-IphoneX 
        height $headerHeight
        width: 100%
        background: #FFFFFF
        border-top: 0.01rem solid #f2f2f2
        position fixed
        left 0
        top 1.88rem
        z-index 101
        .headerLeft
            padding-left 0.5rem
            width 2.5rem
            border-right 0.01rem solid #cccccc
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem
        .headerMiddle 
            margin-left  0.87rem   
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img 
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem

    // 头部
    .header 
        height $headerHeight
        width: 100%
        background: #FFFFFF
        border-top: 0.01rem solid #f2f2f2
        position fixed
        left 0
        top 0.88rem
        z-index 101
        .headerLeft
            padding-left 0.5rem
            width 2.5rem
            border-right 0.01rem solid #cccccc
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem
        .headerMiddle 
            margin-left  0.87rem   
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img 
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem

    .header-Iphone8P 
        height $headerHeight
        width: 100%
        background: #FFFFFF
        border-top: 0.01rem solid #f2f2f2
        position fixed
        left 0
        top 1.28rem
        z-index 101
        .headerLeft
            padding-left 0.5rem
            width 2.5rem
            border-right 0.01rem solid #cccccc
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem
        .headerMiddle 
            margin-left  0.87rem   
            .weiSelectStatus 
                color #333333
                font-size $commonFontSize
            .selectedStatus
                color #FF4C22
                font-size $commonFontSize
            img 
                display inline-block 
                width 0.17rem
                height 0.1rem
                margin-left 0.2rem

    .headerRight
        width 1.2rem
        height 0.58rem
        line-height 0.58rem
        background #FF4C22
        border-radius 0.3rem
        position: absolute
        right: 0.3rem
        span 
            color #FFFFFF
            font-size 0.24rem

    .empty
        height 0.2rem
        width 100%
        background #f2f3f3
        margin-top 1.88rem
    .emptyIponeX
        height 0.2rem
        width 100%
        background #f2f3f3
        margin-top 2.88rem
    .emptyIpone8P
        height 0.2rem
        width 100%
        background #f2f3f3
        margin-top 2.28rem

    

    // 主体
    .main 
        min-height 13rem
        width 100%
        background #F2F3F3
        // padding-top 1.88rem

        // 没有数据要显示的
        .dnoDataInfo
            width 2rem
            margin-top -50%

            .noDaTaClass 
                width 100%
                height 2.06rem
            
            .noDataWenClass
                margin-top 0.4rem
                width 2rem
                text-align center

                span    
                    color #999999
                    font-size $commonFontSize

    .main_data
        width 100%
        background #F2F3F3
        
        .main_data_Inner
            background #FFFFFF
            margin-bottom 1rem   

            .mainImg 
                height 0.6rem
                background #F2F3F3
                width 100%
                img
                    height 100%
            .itemInfo
                height 1.2rem
                border-bottom 0.005rem solid #f2f2f2
                width 100%
                img
                    width 0.8rem
                    height 0.8rem
                    border-radius 50%
                    margin 0 0.3rem
                div
                    .rightTop
                        .rightTopLeft
                            margin-right 0.2rem
                            span 
                                color #333333
                                font-size $commonFontSize
                        .rightTopRight_2
                            width 1.2rem 
                            height 0.3rem
                            background:-webkit-linear-gradient(bottom,#A68B5A,#DFC497)
                            border-radius 0.15rem
                            span
                                color #FFFFFF
                                font-size 0.19rem
                        .rightTopRight_3
                            width 1.2rem 
                            height 0.3rem
                            border-radius 0.15rem 
                            background:-webkit-linear-gradient(bottom,#4A4846,#65635F);
                            span
                                color #FFFFFF
                                font-size 0.19rem
                    .rightBottom
                        color #808080
                        font-size 0.24rem
            // 加载
            .loadding-group 
                width 100%
                height 1rem
                color #666
                font-size 0.3rem
                // padding-bottom 1rem
                // background #f2f2f2
                .loadding 
                    height 0.3rem


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
                    font-size 0.26rem
                
                .numInfo
                    color #FF4C22
                    font-size 0.3rem
            
            .footerRight_bottom
                margin-bottom 0.18rem

                span 
                    color #999999
                    font-size  0.24rem

        .footerRight
            width 2.6rem
            height 100%
            background-color #FF4C22

            span 
                color  #FFFFFF
                font-size 0.3rem


    // 条件筛选项
    .tiaoJianShaiList 
        position fixed
        top 1.88rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22

    .tiaoJianShaiListPhonex 
        position fixed
        top 2.88rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22
    .tiaoJianShaiListPhone8p 
        position fixed
        top 2.28rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22


    // 时间筛选条件
    .shiJianList
        position fixed
        top 1.88rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22

    // 时间筛选条件
    .shiJianListPhonex
        position fixed
        top 2.88rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22
     // 时间筛选条件
    .shiJianListPhone8p
        position fixed
        top 2.28rem
        width 100%
        background #FFFFFF
        border-top 0.0.1rem solid #cccccc
        ul 
            height 100%
            .itemClass
                height 0.9rem
                color #333333
                font-size $commonFontSize
                .tiaoJianMoClass
                    width 2.26rem
                    height 0.58rem
                    span    
                        font-size $commonFontSize
                        color #333333
                .tiaoJianQieClass
                    background #ffede8
                    border-radius 0.3rem
                    width 2.26rem
                    height 0.58rem
                    span 
                        font-size $commonFontSize
                        color #FF4C22

    .loadding
        height 0.3rem


</style>