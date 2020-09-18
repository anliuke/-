// 关闭页面
function goBack(){
    T.GSsdk({
        type:"close"
    })
}
function goBacka(){
    T.GSsdk({
        type:"closeCurrentWeb"
    })
}
// 刷新页面
function refresh(){
    window.location.href = window.location.href
}
function isIphoneX() {
    return (/iphone/gi.test(navigator.userAgent) && (screen.height == 896 && screen.width == 414)) || (/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375))
}
