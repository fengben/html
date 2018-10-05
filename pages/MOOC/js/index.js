var theme_color=$("#theme_color").val();
$(function() {

	upSlideFun("#iQuestion");//向上滚动互动
	scrollLoad(); //响应滚动加载课程图片
	slideScroll("#live-box-in", "#live-box-in .lv-prev", "#live-box-in .lv-next", "#i-live-cou-list", 5, true); //首页直播预告滚动
	slideTeach("#teacher-box-index", "#teacher-box-index .prev", "#teacher-box-index .next", "#teacher-list-index", 5,false); //讲师滚动执行
	listChange(".d2-c-phb-tit a", ".d2-c-phb-body .d2-phb-list", "current");//排行榜一
	listTChange(".d2-c-phb-tit-2 a", ".d2-c-phb-body-2 .d2-phb-list", "current");//排行榜二
	newChange(".d2-i-nr-tit a",".d2-i-nr-body .d2-i-nr-b-list", "current");//选项卡首页2资讯

	var uri = window.location.search;
	var val = "msg";
	var re = new RegExp("" + val + "=([^&?]*)", "ig");
	var msg=((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
	if(msg!=null && msg!='' && msg=='LimitLogin'){
		dialog('提示信息',"您的帐号在其它地点登录，请重新登录",1);
	}
	//后缀为 ?msg=ExternalLogin （外部登录） 弹出登录框
	else if(msg!=null && msg!='' && msg=='ExternalLogin'){
		if(!isLogin()){
            lrFun();
		}
	}//后缀为 ?msg=YQLogin （邀请好友） 弹出注册框
	else if(msg!=null && msg!='' && msg=='YQLogin'){
		if(!isLogin()){
			lrFun(2);
		}
	}
	else if(msg!=null && msg!=''){
		dialog('提示信息',decodeURI(msg),1);
	}
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

			try {
				headerIndexSubject();//第二三版首页 专业 显示 处理
			}catch (err){

			}
		}
	}
	$(window).resize(function(){
		$(".banner-slide").css("height",$(".imgload").eq(0).height());
		try {
			headerIndexSubject();//第二三版首页 专业 显示 处理
		}catch (err){

		}
	});
}

var lodingHtml = '<div class="tac"><img width="100" height="108" alt="" src="/static/inxweb/img/loading.gif"></div>',
	_timer = null;
//教师轮播
function slideTeach(oBox, prev, next, oUl, speed, autoplay) {
	var oBox = $(oBox),
		prev = $(prev),
		next = $(next),
		oUl = $(oUl).find("ul"),
		ulW = oUl.find("li").outerWidth(true),
		oLi = oUl.find("li").length,
		_Li = oUl.find("li"),
		s = speed,
		timer = null;
	oUl.css("width", oLi * ulW + "px");
	_Li.hover(function () {
		//$(this).addClass("current").siblings().removeClass("current");
	});
	_Li.click(function () {
		$(this).addClass("current").siblings().removeClass("current");
		$(".in-teach-warp").eq($(this).val()).show().siblings().hide();
		$(".in-teach-w-in").show();
	});
	//click prev
	next.click(function() {
		if (!oUl.is(":animated")) {
			oUl.animate({"margin-left" : -ulW}, function() {
				oUl.find("li").eq(0).appendTo(oUl);
				oUl.css("margin-left" , 0);
			});
		}
	});
	//click next
	prev.click(function() {
		if (!oUl.is(":animated")) {
			oUl.find("li:last").prependTo(oUl);
			oUl.css("margin-left", -ulW);
			oUl.animate({"margin-left" : 0});
		}
	});
	//autoplay
	if (autoplay === true) {
		timer = setInterval(function() {
			prev.click();
			//alert(1);
		}, s * 1000);
		oBox.hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				prev.click();
			},s * 1000)
		})
	}
}
//为你推荐    换一换
var weinituijianCurrentLayer=0;//当前显示的层数
function huanyihuan(num) {
	var tuijianNum=$("ul[id^='weinituijian']").length;
	if(tuijianNum>1){
		weinituijianCurrentLayer++;//显示下一个
		$("#weinituijian"+weinituijianCurrentLayer).show().siblings("ul").hide();
		scrollLoad(); //响应滚动加载课程图片
		if(weinituijianCurrentLayer>=tuijianNum-1){
			weinituijianCurrentLayer=-1;//重新设置为-1
		}
	}else {
		dialog('提示',"没有更多为你推荐课程显示",1);
	}
}

function bna(ulId,obj) {
   /* 隐藏所有课程*/
    $("#"+ulId).parent().find("ul").hide();
    /*显示选中的课程*/
    $("#"+ulId).show();
    $(obj).parent().find("a").removeClass("current");
    $(obj).addClass("current");
	scrollLoad(); //响应滚动加载课程图片
}

function slideScroll(oBox, prev, next, oUl, speed, autoplay) {
	var oBox = $(oBox),
		prev = $(prev),
		next = $(next),
		oUl = $(oUl).find("ul"),
		ulW = oUl.find("li").outerWidth(true),
		oLi = oUl.find("li").length,
		s = speed,
		timer = null;
	oUl.css("width", oLi * ulW + "px");
	//click prev
	next.click(function() {
		if (!oUl.is(":animated")) {
			oUl.animate({"margin-left" : -ulW}, function() {
				oUl.find("li").eq(0).appendTo(oUl);
				oUl.css("margin-left" , 0);
			});
		}
	});
	//click next
	prev.click(function() {
		if (!oUl.is(":animated")) {
			oUl.find("li:last").prependTo(oUl);
			oUl.css("margin-left", -ulW);
			oUl.animate({"margin-left" : 0});
		}
	});
	//autoplay
	if (autoplay === true) {
		timer = setInterval(function() {
			prev.click();
		}, s * 1000);
		oBox.hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				prev.click();
			}, s * 1000)
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
//选项卡公共方法
function listTChange(oTitle, oCont, current) {
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
//选项卡首页2资讯
function newChange(oTitle, oCont, current) {
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
/*首页3专业切换*/
function selectSubject(subjectId,obj) {
	var ulclass = ".subject"+ subjectId;
	/*隐藏所有*/
	$(ulclass).parent().find("ul").hide();
	/*显示选中*/
	$(ulclass).show();
	/*去除导航选中*/
	$(obj).parent().parent().find("li").removeClass("current");
	/*点击导航添加选中*/
	$(obj).parent().addClass("current")
}