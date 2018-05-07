/**
 * 首页 专业 显示 处理
 */
function headerIndexSubject() {
	if(!checkIsMobile()){
        $(".n-item-menu").show();
        $(".d3-ba-r-login").show();
	}

	if ($("section.n-i-m-more.i-j-it-all").length > 0) {
		var bannerHeight = $(".imgload").eq(0).height();
		if (bannerHeight==null){
			bannerHeight = $(".i-j-it-all").eq(0).height()*($(".i-j-it-all").length+1)
		}
		//第三版首页 专业展示框
		$(".h3-nav .n-i-m-bottom").css("height", bannerHeight-$(".n-item-menu div.n-i-m-top").height());
		$(".h3-nav .n-item-right.n-item-right-op").css("height", parseInt(bannerHeight - 2));
		$(".d3-ba-r-login").css("height", bannerHeight-bannerHeight*0.1);

		//section i-j-item i-j-it-all高度
		var sectionHeight = $("section.i-j-item.i-j-it-all").height();
		//计算可以显示几个
		var showNum = parseInt( (bannerHeight-$(".n-item-menu div.n-i-m-top").height()) / sectionHeight - 1);
		//有几个可以显示的 专业 section i-j-item i-j-it-all个数
		var showSize = $("section.i-j-item.i-j-it-all").size();
		//第二版首页 专业展示框 更多课程 按钮 是否展示出来  或者   更多课程 下面还能有显示空间 ，并且还有专业
		if ($("section.n-i-m-more.i-j-it-all").position().top > bannerHeight || ($("section.n-i-m-more.i-j-it-all").position().top < bannerHeight && $("section.n-i-m-more.i-j-it-all").index() < showSize)) {
			var $more_tag = $("section.n-i-m-more.i-j-it-all");    //  获取 更多课程 元素节点
			var $two_li = $("section.i-j-item.i-j-it-all:eq(" + showNum + ")");
			$more_tag.insertBefore($two_li);    //移动节点
		}
		//隐藏 更多课程 元素节点之后的
		$("section.i-j-item.i-j-it-all:gt(" + parseInt(showNum - 1) + ")").css("visibility", "hidden");
		//显示 更多课程 元素节点之前的
		$("section.i-j-item.i-j-it-all:lt(" + showNum + ")").css("visibility", "visible");
	}
}
/*课程列表左侧高度计算*/
function leftPicH() {
	var liH = $(".d3-in-right ul li .cc-l-wrap").height();
	//console.log(liH)
    $(".d3-left-pic").css("height",liH*2+30);

}
window.onresize = function() {leftPicH();};