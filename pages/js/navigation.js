/* 菜单路由 */
window.addEventListener('hashchange', function(e) {
    var e = e || window.event;
    console.log(e.oldURL);
    console.log(e.newURL);
    var a = e.newURL.split("#")[1];
    loadHtml("./html/"+a+".html", "#page-content")
}, false);