<template>
    <div>
         <!-- 导航栏 -->
        <common-title :title="title"></common-title>

        <div :class="{'payMain': andriodStatus,'payMainPhone': iphoneStaus, 'payMainPhone8': iphone8Staus}">
            <ul class="mainHeader flex justifyBetween flexWrap box-sizing">
                <li v-for="(info, index) in dataArray" :key="info.id" >
                    <div class="liTop flex justifyCenter alignCenter" :class="{'liTop_inner_check': isChecked === index}" @click="checkItem(info, index)">
                        <div>
                            <div>{{ info.data.num }} 条</div>
                            <div>￥{{ info.data.money }}</div>
                        </div>   
                    </div>
                </li>
            </ul>
            <!-- 选择radio -->
            <div class="select_radio">
                <mt-radio
                    v-model="selectedValue"
                    :options="selectOptions"
                    @change="radioSelectEmit">
                </mt-radio>
            </div>
            <!-- 提示文字 -->
            <div class="alertTitle">
                <span>提示：未使用短信条数，不可转让和兑现。</span>
            </div>
        </div>
        <div class="payButton flex justifyCenter alignCenter">
            <div class="payButtonInner flex justifyCenter alignCenter" @click="buyMessageEmit('successPayEmit', 'failePayEmit')">
                <span>购买</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getMessagePayInfo, payMessageEmit} from '@/api/payMessage'
import { Toast, MessageBox } from 'mint-ui'
import CommonTitle from '@/components/CommonTitle'
export default {
    name: 'pay',
    components: {
        CommonTitle
    },
    data () {
        return {
            title: '短信购买',
            dataArray: [],

            isChecked: '',  // 选择默认
            selectOptions: [],
            selectedValue: '',  // radio选择的值
            selectRadioId: 1,  // radio选择的id
            selectMoneyId: '',  // 选择钱的选项id
            paySuccess: '支付成功', 

            andriodStatus: true,
            iphoneStaus: false,

            iphone8Staus: false,
            iphone8HeaderStaus: false,
        }
    },

    methods: {

        // 获取选择项数据
        getPayInfoList() {
            getMessagePayInfo({}).then(res => {
                if (res.data.template != []) {
                    this.dataArray = res.data.template;   
                }
                this.selectOptions = ['更省2号钱包 (余额：' + res.data.money + '元)', '支付宝支付'];
            })
        },



        // radio单选事件
        radioSelectEmit() {
            // this.selectRadioId = '';
            if (this.selectedValue == '支付宝支付') {
                this.selectRadioId = 0;
            } else {
                this.selectRadioId = 2;
            }
        },

        // 选择金钱模版信息
        checkItem (info, index) {
            this.isChecked = index;
            this.selectMoneyId = info.id;
        },

        // 购买事件
        buyMessageEmit(callBack,callBack1) {
            if (this.selectRadioId == 1 && this.selectMoneyId == '') {
                MessageBox({
                    title: '提示',
                    message: '请选择支付方式和套餐项',
                    showCancelButton: true
                })
            } else if (this.selectRadioId == 1) {
                MessageBox({
                    title: '提示',
                    message: '请选择支付方式',
                    showCancelButton: true
                })
            } else if (this.selectMoneyId == '') {
                MessageBox({
                    title: '提示',
                    message: '请选择套餐项',
                    showCancelButton: true
                })
            } else {
                payMessageEmit({
                    type: this.selectRadioId,
                    sms_id: this.selectMoneyId,
                }).then((res) => {

                    // 2号钱包支付
                    if (this.selectRadioId == 2) {
                        if (res.code == 0) {
                            MessageBox({
                                title: '提示',
                                message: '支付成功',
                                showCancelButton: true
                            })
                            this.getPayInfoList();  
                        }
                    } else if (this.selectRadioId == 0) {   // 支付宝支付
                        if (this.$t.GScheck()) {
                            this.$t.GSsdk({
                                type: 'aliPay',
                                content: res.data.alipay,
                                url: 'successPayEmit',
                                ico: 'failePayEmit'
                            })
                        }
                    } 
                    // 清空选择支付项id
                    this.selectRadioId = 1;
                    // 清空选择项id
                    this.selectMoneyId = '';
                    // 清空被选择项样式
                    this.isChecked = '';
                    // 清除radio选择框内容
                    this.selectedValue = '';
                })
            }
        },

        // 支付成功
        successPayEmit() {
            MessageBox({
                title: '提示',
                message: '支付成功',
                showCancelButton: true
            })
        },
        
        // 支付失败
        failePayEmit () {
            MessageBox({
                title: '提示',
                message: '支付失败, 请重新支付',
                showCancelButton: true
            })
        },
    },

    created () {
        if(this.$t.ioscheck()){
            if(this.$t.isIphoneX() || this.$t.isIPhoneXR()){
                // console.log(10);
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
    
    mounted() {
        this.getPayInfoList();  
        let me = this;
        window['successPayEmit'] = () => {
            // Toast({ message: url, position: 'bottom', duration: 5000 });
            me.successPayEmit()
        }

        window['failePayEmit'] = () => {
            // Toast({ message: url, position: 'bottom', duration: 5000 });
            me.failePayEmit()
        }
    }
}


</script>

<style lang="stylus" scoped>
    .payMain
        .mainHeader
            margin-top 1.02rem
            width 100%
            height 2.8rem
            padding 0 0.3rem
            li  
                width 1.88rem
                height 1.07rem
                margin  0 0.1rem
                border-radius 0.04rem
                .liTop
                    width 100%
                    height 100%
                    border 0.012rem solid #FF4C21
                    border-radius 0.04rem
                    div
                        color #333333
                        font-size 0.24rem
                .liTop_inner_check
                    background #FF4C21
                    div
                        color #FFFFFF
                        font-size 0.24rem
        .alertTitle
            padding 0 0.48rem
            margin-top 0.3rem
            span   
                color #999999
                font-size 0.22rem 

    .payMainPhone
        .mainHeader
            margin-top 2.02rem
            width 100%
            height 2.8rem
            padding 0 0.3rem
            li  
                width 1.88rem
                height 1.07rem
                margin  0 0.1rem
                border-radius 0.04rem
                .liTop
                    width 100%
                    height 100%
                    border 0.012rem solid #FF4C21
                    border-radius 0.04rem
                    div
                        color #333333
                        font-size 0.24rem
                .liTop_inner_check
                    background #FF4C21
                    div
                        color #FFFFFF
                        font-size 0.24rem
        .alertTitle
            padding 0 0.48rem
            margin-top 0.3rem
            span   
                color #999999
                font-size 0.22rem 
    .payMainPhone8
        .mainHeader
            margin-top 1.42rem
            width 100%
            height 2.8rem
            padding 0 0.3rem
            li  
                width 1.88rem
                height 1.07rem
                border-radius 0.04rem
                .liTop
                    width 100%
                    height 100%
                    border 0.012rem solid #FF4C21
                    border-radius 0.04rem
                    div
                        color #333333
                        font-size 0.24rem
                .liTop_inner_check
                    background #FF4C21
                    div
                        color #FFFFFF
                        font-size 0.24rem
        .alertTitle
            padding 0 0.48rem
            margin-top 0.3rem
            span   
                color #999999
                font-size 0.22rem 


    .payButton
        width 100%
        height 0.82rem
        margin-top 0.42rem
        .payButtonInner
            width 6.22rem
            height 100%
            background #FF4C21
            border-radius 0.04rem
            span    
                color #FFFFFF
                font-size 0.3rem

                            
  

            
            
            


      
</style>