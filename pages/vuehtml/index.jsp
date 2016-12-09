

<!DOCTYPE html>
<html>
<head>
	<base href="http://coach.cjxitong.cn/">
	<meta charset="utf-8" />
	<title>的主页</title>
	<meta name="viewport" content="width=device-width,  minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta content="telephone=no" name="format-detection"/>
	<meta http-equiv="x-dns-prefetch-control" content="on"/>
	<link rel="dns-prefetch" href="https://res.wx.qq.com"/>
	<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/0.4.0/weui.min.css"/>
	<link rel="stylesheet" type="text/css" href="/css/util.css"/>
	<style type="text/css">
		*{margin: 0;padding: 0;}
		li{list-style: none;}
		body{font-family: simhei,"microsoft yahei";font-size: 15px;background-color: #efeff4;}
		html{-webkit-text-size-adjust: none;}
		a{text-decoration: none;color: #000;}
		.icon{
			display: inline-block;
			width: 26px;
			height: 26px;
			margin: 0 auto;
		}
		.edit_icon{
			background: url(/images/coach_index_icon.png) 0 0 no-repeat;
			background-size: 26px;
		}
		.email_icon{
			background: url(/images/coach_index_icon.png) 0 -26px no-repeat;
			background-size: 26px;
			vertical-align: bottom;
			margin-bottom: -1px;
			margin-left: 30px;
		}
		.weui_media_hd img{border-radius: 50%;}
		.coach_header .weui_panel_bd{background-color: #FFF;}

		.panel_title{color: #888;font-size: 14px;}
		.weui_media_box .weui_media_desc {
			line-height: 20px;
			font-size: 15px;
			color: #888;
		}
		.list_avatar{
			width: 50px;
			height: 50px;
			padding-right: 8px;
		}
		.list_phone{width: 40px;padding-left: 20px;}
		.list_phone:before{height: 50px;top:-4px;}
		.list_title{font-size: 15px;color: #888;}
		.list_title_name{margin-bottom: 2px;}
		.location:before{
			content: "";
			display: inline-block;
			width: 16px;
			height: 20px;
			background: url(/images/coach_index_icon.png) -5px -49px no-repeat;
			background-size: 24px;
		}
		img{border-radius: 50%;}
		.thin-left:before {background-color: #d9d9d9;}
		.jxName{display:inline-block;min-width: 114px;}
		.empty_msg{padding: 16px;text-align: center;color: #999;font-size: 14px;}
		.load_msg{padding: 6px 0;text-align: center;color: #5C5656;font-size: 14px;}
	</style>
	<script src="/js/vue.min.js"></script>
	<script src="/js/vue-infinite-scroll.js"></script>
	<script type="text/javascript">
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?57ebdb620621f3901d5d761ed140cb08";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	</script>
</head>
<body>
	<div id="vueApp">
		<div class="coach_header">
			<div class="weui_panel_bd">
				<div class="weui_media_box weui_media_appmsg">
					<div class="weui_media_hd">
						<img class="weui_media_appmsg_thumb" :src="coach.headimg" alt="" style="height: 100%;">
					</div>
					<div class="weui_media_bd" style="color: #999;">
						<div class="clearfix">
							<span v-text="coach.name"></span>
							<a href="/coach/auth/toEdit.do" class="icon edit_icon pull-right"></a>
						</div>
						<div>
							<span v-text="coach.jx"></span>
							<a href="/coach/message.jsp?coachOpenid={{coach.openid}}" style="color: #999;"><span class="icon email_icon"></span>(<span style="color: #d70212;">0</span>)</a>
						</div>
						<div style="padding-top: 2px;" v-text="coach.mobile"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="coach_info" v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="40">
			<div class="weui_cells">
				<div class="weui_cell">
					<div class="weui_cell_bd weui_cell_primary panel_title">
						本地教练排行
					</div>
					<div class="weui_cell_ft">
						<a @click="signAction" class="weui_btn weui_btn_mini" :class="{'weui_btn_primary':!isSign,'weui_btn_default':isSign}" v-text="isSign?'已签到':'签到置顶'"></a>
					</div>
				</div>
				<template v-for="item in signedList" track-by="$index">
					<div class="weui_cell">
						<div class="weui_cell_hd list_avatar">
							<a href="/coach/detail.do?coachOpenid={{item.openid}}"><img :src="item.headimg"/></a>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<a href="/coach/detail.do?coachOpenid={{item.openid}}">
								<p class="list_title list_title_name">{{item.name}}</p>
								<p class="list_title"><span class="jxName">{{item.jx}}</span> <span class="location">{{item.lng | calcDistance item.lat }}km</span></p>
							</a>
						</div>
						<div class="weui_cell_ft thin-left list_phone">
							<a href="tel:{{item.mobile}}"><img src="/images/card_phone_icon.png" alt=""/></a>
						</div>
					</div>
				</template>
			</div>
			<div v-if="0===signedList.length" class="empty_msg" v-text="emptyMsg"></div>
			<div v-if="0!==signedList.length" class="load_msg" v-text="loadMsg"></div>
		</div>
		<div id="toast" style="display: none;" v-show="successToast">
			<div class="weui_mask_transparent"></div>
			<div class="weui_toast">
				<i class="weui_icon_toast"></i>
				<p class="weui_toast_content" v-text="successToastText"></p>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="http://cdn.staticfile.org/fastclick/1.0.6/fastclick.min.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="http://map.qq.com/api/js?v=2.exp&libraries=convertor" charset="utf-8" ></script>
	<script type="text/javascript" src="/js/common.js"></script>
	<script type="text/javascript">
		var baseUrl = 'http://coach.cjxitong.cn/';
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
		!isWechat && getPositionByH5();
                var curCity=''.split(' ');
                if(curCity.length>2){
                   curCity=curCity[0]+' '+curCity[1];
		}else{
		   curCity=curCity.join(' ');
		}
		var paramsData={
			loading:false,
			loadOver:false,
			page:1,
			pageSize: 10,
			city:curCity
		};

		var vueApp = new Vue({
			el:'#vueApp',
			data:{
				coach:{
					openid:'',
					name:'',
					mobile:'',
					jx:'',
					headimg:'',
					city:'',
					addr:'',
					lng:'',
					lat:'',
					signedTime:''
				},
				h5Ok:false,
				busy: false,
				viewrOpenid:'',
				ajaxFinished:true,
				showSelectBtn: true,
				showMask:false,
				emptyMsg:'正在加载本地教练排行...',
				loadMsg:'正在加载更多数据....',
				successToast:false,
				signedList:[],
				lng:'', //当前位置
				lat:''
			},
			computed: {
				isMyself:function(){
					return this.coach.openid===this.viewrOpenid;
				},
				isSign:function(){
					var now=new Date().toISOString().split('T')[0];
					return -1!=this.coach.signedTime.indexOf(now);
				}
			},
			methods:{
				loadMore: function() {
					//加载签到教练数据
					if(paramsData.loading || paramsData.loadOver){return ;}
					paramsData.loading=true;
					this.busy = true;
					ajax({
						method:'post',
						url:'/coach/getSignedList.do',
						data:paramsData,
						callback:function(result){
							var resultLenght=result.obj.data.length;
							if(resultLenght>0){
								//TODO:注意，如果出现性能问题，用文档碎片来提交效率 fragment=document.createDocumentFragment()
								vueApp.signedList=vueApp.signedList.concat(result.obj.data);
								Vue.nextTick(function () {
									if(result.obj.totalPage > paramsData.page){
										paramsData.page+=1;
										vueApp.busy=false;
									}else{
										paramsData.loadOver=true;
										vueApp.loadMsg='数据已全部加载完.';
									}
									paramsData.loading=false;
								});
							}else{
								vueApp.emptyMsg='还没有教练加入排行版';
							}
						}
					});
				},
				signAction:function(){
					if(vueApp.isSign){return;}
					ajax({
						method:'get',
						url:'/coach/auth/signed.do',
						callback:function(result){
							if(result.success){
								for(var i= 0,len=vueApp.signedList.length;i<len;i++){
									if(vueApp.signedList[i].openid===vueApp.coach.openid){
										vueApp.signedList.splice(i,1);
										break;
									}
								}
								vueApp.signedList.unshift(vueApp.coach);
								vueApp.coach.signedTime=new Date().toISOString().split('T')[0];
							}
						}
					});
				}
			}
		});

		Vue.filter('calcDistance', function (lng,lat) {
			if(!vueApp.lng){
				vueApp.lng=vueApp.coach.lng;
				vueApp.lat=vueApp.coach.lat;
			}
			return getDistance(vueApp.lng,vueApp.lat,lng,lat);
		});

		//分享
		var jsSdkParam={
			debug: false,
			appId: 'wx4e8b9da30a62f12b',
			timestamp: '1477388212',
			nonceStr: 'pJ26KVGhSMCvUxSL',
			signature: 'b20d4d817227047cf8ec43e6d07c8dd53114c115',
			jsApiList: ['checkJsApi','getLocation','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']
		};
		wx.config(jsSdkParam);
		//域名不能带端口，否则链接打开失败
		var tempHeadImg = vueApp.coach.headimg;
		var headimg = tempHeadImg.indexOf("http") != -1 ? tempHeadImg : baseUrl + tempHeadImg;

		var wxAuth='http://token.cjxitong.cn/index.jsp?t=base&redirect=URI';
		var shareUrl=baseUrl+'coach/detail.do?coachOpenid='+vueApp.coach.openid;
		var wxShareUrl=wxAuth.replace('URI',shareUrl);

		var shareParam={
			title: '我是【'+vueApp.coach.name+'】教练，这是我培训的场地，附近想学车的朋友可以找我',
			link: wxShareUrl,
			qqLink: shareUrl,
			imgUrl: headimg,
			desc:'想学车报名的可以来找我'
		};

		wx.ready(function(){
			wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					vueApp.lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					vueApp.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				},
				fail:function(){
					getPositionByH5();
				},
				error:function(){
					getPositionByH5();
				}
			});
			wx.onMenuShareTimeline({
				title: shareParam.title,
				link: shareParam.link,
				imgUrl: shareParam.imgUrl
			});
			wx.onMenuShareAppMessage({
				title: shareParam.title,
				desc: shareParam.desc,
				link: shareParam.link,
				imgUrl: shareParam.imgUrl
			});
			wx.onMenuShareQQ({
				title: shareParam.title,
				desc: shareParam.desc,
				link: shareParam.qqLink,
				imgUrl: shareParam.imgUrl
			});
			wx.onMenuShareQZone({
				title: shareParam.title,
				desc: shareParam.desc,
				link: shareParam.qqLink,
				imgUrl: shareParam.imgUrl
			});
		});


		function getPositionByH5(){
			//判断是否支持 获取本地位置
			if (navigator.geolocation){
				var options = {
					enableHighAccuracy: true,
				};
				setTimeout(function(){
					!vueApp.h5Ok&&getPositionByIp();
				},1800);
				navigator.geolocation.getCurrentPosition(function(position){
					vueApp.h5Ok=true;
					var lat=position.coords.latitude;
					var lng=position.coords.longitude;
					//调用地图命名空间中的转换接口
					//type的可选值为 1:gps经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
					qq.maps.convertor.translate(new qq.maps.LatLng(lat,lng), 1, function(res){
						//取出经纬度并且赋值
						var latlng = res[0];
						vueApp.lng=latlng.lng;
						vueApp.lat=latlng.lat;
						searchCoach();
					});
				},function(){
					(0==vueApp.signedList.length)&&getPositionByIp();
				},options);
			}
			else{
				getPositionByIp();
			}
		}

		function getPositionByIp(){
			//通过IP来定位
			var citylocation = new qq.maps.CityService();
			//请求成功回调函数
			citylocation.setComplete(function(result) {
				var latlng=result.detail.latLng;
				vueApp.lng=latlng.lng;
				vueApp.lat=latlng.lat;
			});
			//请求失败回调函数
			citylocation.setError(function() {
				alert("出错了，请输入正确的经纬度！！！");
			});
			citylocation.searchLocalCity();
		}

	</script>
</body>
</html>
