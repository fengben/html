$(function(){
	sSwiperFun(); //幻灯片调取
	liveRecommended(0);//推荐直播
	scrollLoad(); //响应滚动加载课程图片
	cardChange(".lately-live",".la-r-t-list li","#la-l-cont .la-l-c-box","current",true);//直播近期播放
	listChange(".c-l-phb-tit a", ".cl-phb .c-l-phb-box","current");//排行榜切换
	conDowFun();//直播倒计时
});
//首页响应式幻灯片调取方法
function sSwiperFun() {
	var _sWrap = $('.banner-slide .swiper-container');
	var mySwiper = _sWrap.swiper({
		loop: true, //无缝连接滚动
		autoplay : 5000, //自动滚动
		autoplayDisableOnInteraction : false, //设置点击后是否继续滚动
		speed:300, //滚动速度
		pagination : '.pagination', //设置分页
		paginationClickable :true //设置true分页点击执行swiper
	});
	$('.banner-slide .arrow-left').on('click', function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	});
	$('.banner-slide .arrow-right').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});

	if($(".imgload").length>0){
		$(".imgload").eq(0).get(0).onload=function(){
			$(".banner-slide").css("height",$(".imgload").eq(0).height());
		}
	}
	$(window).resize(function(){
		$(".banner-slide").css("height",$(".imgload").eq(0).height());
	});
}//好课推荐轮播

/**
 * 推荐直播
 */
function liveRecommended(subjectId,obj) {
	if(subjectId==0){
		$("#subjectId0").addClass("current");
		$("#subjectId0mobile").addClass("current");
	}
	$(obj).addClass("current").siblings().removeClass("current");
	$.ajax({
		url :baselocation +  "/live/ajax/liveRecommended",
		data : {
			"subjectId":subjectId
		},
		type : 'post',
		dataType : 'text',
		beforeSend:function(){
			$("#liveRecommend").html('<div class="tac"><img width="100" height="108" alt="" src="/static/inxweb/img/loading.gif"></div>');
		},
		success : function(result) {
			$("#liveRecommend").html(result);
			scrollLoad(); //响应滚动加载课程图片
		}
	});
}
function cardChange(oBox,oTitle, oCont, current, auto) {
	var oBox = $(oBox),
		oTitle = $(oTitle),
		oCont = $(oCont),
		_index;
	oTitle.hover(function() {
		_index = oTitle.index(this);
		$(this).addClass(current).siblings().removeClass(current);
		oCont.eq(_index).show().siblings().hide();
	}).eq(0).hover();
	// autoChange;
	var _i = 0;
	var _timer = null;
	var _oLi = oTitle.size();
	var changeFun = function(q) {
		_i = q;
		oTitle.eq(q).addClass(current).siblings().removeClass(current);
		oCont.eq(q).show().siblings().hide();
	};
	if (auto === true) {
		_timer = setInterval(function() {
			_i++;
			if (_i > _oLi) {
				_i = 0;
			}
			changeFun(_i);
		}, 6000);

		oBox.hover(function() {
			clearInterval(_timer);
		}, function() {
			_timer = setInterval(function() {
				_i++;
				if (_i > _oLi) {
					_i = 0;
				}
				changeFun(_i);
			}, 6000);
		})
	}
}
//选项卡公共方法
function listChange(oTitle, oCont, current) {
	var oTitle = $(oTitle),
		oCont = $(oCont),
		_index;
	oTitle.click(function() {
		_index = oTitle.index(this);
		$(this).addClass(current).siblings().removeClass(current);
		oCont.eq(_index).show().siblings().hide();
		console.log(oCont.eq(_index));
		oCont.attr("id");
	}).eq(0).click();
}

//直播倒计时
function conDowFun() {
	$("div[id^='showTimes']").each(function(index,tag){
		var second=$(tag).attr("livetimeval");
		ss = second%1000;
		second = (second -ss)/1000;
		//写一个方法，将秒数专为天数
		if (second > 0) {

			var toDays = function () {
				var s = second % 60; // 秒
				if (s < 10) {
					s = "0" + s;
				}
				var mi = (second - s) / 60 % 60; // 分钟
				var h = ((second - s) / 60 - mi ) / 60 % 24; // 小时
				if (h < 10) {
					h = "0" + h;
				}
				var d = (((second - s) / 60 - mi ) / 60 - h ) / 24; // 天
				return '<span class="c-fff f-fM vam fsize16">距离直播还有：</span><tt class="f-fM">' + d + '</tt>天<tt class="f-fM">' + h + '</tt>时<tt class="f-fM">' + mi + '</tt>分<tt class="f-fM">' + s + '</tt>秒';
			};
			//然后写一个定时器
			window.setInterval(function () {
				if (second > 0) {
					second--;
				}
				$(tag).html(toDays());
			}, 1000);
		}
	});
}