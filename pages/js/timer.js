/* 首页时间显示器 */
try{
	setInterval(function(){
		$("#now-time").html(_getTime());
		function _getTime(){
			var _time = new Date();
			var yyyy  = _time.getFullYear();
			var mm    = _time.getMonth()+1 > 9 ? _time.getMonth()+1 : "0"+(_time.getMonth()+1);
			var dd    = _time.getDate() > 9    ? _time.getDate()    : "0"+_time.getDate();
			var hh    = _time.getHours() > 9   ? _time.getHours()   : "0"+_time.getHours();
			var min   = _time.getMinutes() > 9 ? _time.getMinutes() : "0"+_time.getMinutes();
			var ss    = _time.getSeconds() > 9 ? _time.getSeconds() : "0"+_time.getSeconds();
			return "" + yyyy + "/" + mm + "/" + dd + " " + hh + ":" + min + ":" + ss;
		}
	}, 1000);
}catch(e){console.log(e)}