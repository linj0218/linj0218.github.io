var piobj = function(){};
piobj.prototype = {
	init : function(_id){
		this.initHtml(_id);
	},
	initHtml : function(_id){
		var self = this;
		var pibox = document.createElement("div");
		pibox.id = "preview-box";

		var pibg = document.createElement("div");
		pibg.id = "preview-bg";
		
		var piimgs = document.createElement("div");
		piimgs.id = "preview-imgs";

		var piimgsHtml = '';
		piimgsHtml += '	<!-- Swiper -->';
        piimgsHtml += '	<div class="swiper-container">';
        piimgsHtml += '		<!-- 图片列表 -->';
        piimgsHtml += '		<div class="swiper-wrapper"></div>';
        piimgsHtml += '		<!-- 分页器 -->';
		piimgsHtml += '		<div class="swiper-pagination"></div>';
        piimgsHtml += '		<!-- 上下图按钮 -->';
        piimgsHtml += '		<div class="swiper-button-prev"></div>';
		piimgsHtml += '		<div class="swiper-button-next"></div>';
        piimgsHtml += '	</div>';

        piimgs.innerHTML = piimgsHtml;
		
		pibox.appendChild(pibg);
		pibox.appendChild(piimgs);
		document.getElementsByTagName("body")[0].appendChild(pibox);

		if(!document.getElementById("swiper-id")){
            var l = document.createElement('link');
            l.rel = 'stylesheet';  
            l.href = 'http://cdn.staticfile.org/Swiper/3.2.7/css/swiper.min.css';  
            /* 加载swiper js文件 */
            var s = document.createElement('script');  
            s.id = 'swiper-id';
            s.type = 'text/javascript';  
            s.src = 'http://cdn.staticfile.org/Swiper/3.2.7/js/swiper.min.js';  
            var x = document.getElementsByTagName('script')[0];  
            x.parentNode.insertBefore(l, x);
            x.parentNode.insertBefore(s, x); 
	        if (!/*@cc_on!@*/0) { //if not IE
	            //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
	            s.onload = function () {
	                self.initSwiper(_id);
	            }
	        } else {
	            //IE6、IE7 support js.onreadystatechange
	            s.onreadystatechange = function () {
	                if (s.readyState == 'loaded' || s.readyState == 'complete') {
	                    self.initSwiper(_id);
	                }
	            }
	        }
        }else {
        	self.initSwiper(_id);
        }
	},
	initSwiper : function(_id){
		var imgs = document.getElementById(_id).getElementsByTagName("img");
		var piimgsHtml = '';
		for(var i=0, len=imgs.length; i<len; i++){
			piimgsHtml += '			<div class="swiper-slide">';
	        piimgsHtml += '				<img src="' + imgs[i].src + '">';
	        piimgsHtml += '			</div>';
			
		}
        document.getElementsByClassName("swiper-wrapper")[0].innerHTML = piimgsHtml;
		var swiper = new Swiper('.swiper-container',{
			initialSlide :0,		//初始位置
			direction : 'horizontal',	//水平：horizontal，垂直：vertical
			// autoplay : 3000,		//自动播放
			speed:300,				//滑动速度
			effect : 'slide',		//默认为"slide"（位移切换），可设置为"fade"（淡入）"cube"（方块）"coverflow"（3d流）
			pagination : '.swiper-pagination',	//分页器
			prevButton:'.swiper-button-prev',	//上下图按钮
			nextButton:'.swiper-button-next',
			loop : true,			//循环切换
		});
		this.eventBind(_id);
	},
	eventBind : function(_id){
		document.getElementById(_id).onclick = function(){
			document.getElementById("preview-box").setAttribute("class", "on");
		}
		document.getElementById("preview-imgs").addEventListener("click", function(e){
			// e.preventDefault();
            var event = e || window.event;
            var target = event.target || event.srcElement;
			console.log(target.className);
			if(target.className == "swiper-button-prev" || target.className == "swiper-button-next"){

			}else {
				document.getElementById("preview-box").setAttribute("class", "");
			}
		}, false);
	}
};
/*window.onload = function(){
	new piobj().init("asdf");
}*/