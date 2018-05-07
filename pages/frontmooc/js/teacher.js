/**
 * Created by Administrator on 2016/12/14.
 */
$(function(){
    cSortFun();//展开更多
});
//sort suMore
var cSortFun = function() {
    $(".c-s-dl>dl .c-s-more>a").each(function() {
        var _this = $(this),
            _uList = _this.parent().siblings("ul"),
            _uLw = _uList.height();
        if (_uLw <= "50") {
            _this.hide();
        } else {
            _uList.css("height","40px");
            _this.click(function() {
                if(_this.html() == "[展开]") {
                    _uList.css("height","auto");
                    _this.text("[收起]");
                } else {
                    _uList.css("height" , "40px");
                    _this.text("[展开]");
                }
            })
        }
    });
};