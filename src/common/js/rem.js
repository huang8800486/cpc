(function(doc,win){
    var docEl = doc.documentElement;
    var resizeEvt = "orientationchange" in win ? "orientationchange" : "resize";
    var Timer = null;
    function recalc(){
        var clientWidth = docEl.clientWidth || win.innerWidth;
        //设计稿是750px
        var initSize = (clientWidth * 2) / 10;
        var fontSize = clientWidth > 768 ? 153 : initSize
        docEl.style.fontSize = fontSize + "px";
    }
    doc.addEventListener("DOMContendLoaded",recalc,false);

    //转屏
    win.addEventListener(resizeEvt, recalc, false);

    //pageshow,缓存相关
    win.addEventListener("pageshow",function(e){
        if(e.persisted){
            recalc();
        }
    },false);

    // 初始化
    recalc();

})(document,window);