function loadHtml(url,target){
    var args = '';
    if(url.split("?")[1]){
        args = '<div id=\'args\' style=\'display: none;\' data-args=\''+url.split("?")[1]+'\'></div>';
    }
    $.ajax({
        type: "get",
        url: url,
        dataType: "html",
        async: false,
        success: function (data) {
            $(target).html(args+data);
        }
    });
}
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

/* 
    微信图片浏览
    curSrc: 当前图片url
    srcList: 图片list
 */
function imagePreview(curSrc,srcList) {
    if(!curSrc || !srcList || srcList.length == 0) {
        return;
    }
    WeixinJSBridge.invoke('imagePreview', {
        'current' : curSrc,
        'urls' : srcList
    });
}
/*是否微信浏览器*/
function isWeixnBrower(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}