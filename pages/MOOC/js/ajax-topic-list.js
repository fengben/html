var scrollload=true;//是否可以加载
var scroll_currentPage=0;//页面滚动了几次
var smpage=3;//页面滚动三次时作为一次分页
var scrolllpage=true;
var topicType=0;
var _timer = null;
/*
 * @param type 0所有 1话题 2活动
 * @param pageNum 要加载的页数，为零获取页面的
 */
function getAllTopic(type,pageNum){
	topicType=type;
	var currentPage;
	if(pageNum==0){
		currentPage=$(".loading").attr("realPageNum");
	}else{
		$("#indexTopicAll").html("");
		currentPage=(pageNum-1)*smpage+1;
		$("#global-goTop").click();
	}
	scroll_currentPage=parseInt(currentPage)+1;//保存滚动的数
	scrollload=false;
	$.ajax({
		type : "POST",
		dataType : "text",
		url:baselocation+"/front/ajax/getAllTopic/"+currentGroupId+"/"+type,
		data : 'page.currentPage='+currentPage+filterParam+relationIds+kpointId,
		cache : true,
		async : false,
		beforeSend: function(XMLHttpRequest){
			clearTimeout(_timer);
	        $(".loading").show();
	    }, 
		success : function(result){
			_timer = setTimeout(function() {
				if(pageNum!=0){
					$("#indexTopicAll").html(result);
					$("#indexTopicAll>ul").addClass("otShow");
				}else{
					$("#indexTopicAll").append(result);
					$("#indexTopicAll>ul").addClass("otShow");
				}
				browserRedirect();//用户信息悬浮显示
				scrollload=true;
				$(".loading").hide();
			}, 300);
		}
	});
}

/*
* 推荐/话题/活动 选项卡选择查询
*/
function changeSelectTopic(obj,type){
	$(obj).parent().addClass("current").siblings().removeClass();
	getAllTopic(type,1)
}

//动态类型下拉选择
function ssFun() {
	var _sBox = $(".t-s-select"),
		_sTxt = $(".s-vv-txt>q"),
		_sOl = _sBox.children(".s-vv-ol"),
		_sLi = $(".s-vv-ol>li");
	_sBox.mouseover(function() {
		_sOl.stop().slideDown(80);
	});
	_sBox.mouseout(function(){
		_sOl.stop().slideUp(80);
	}); 
	_sLi.each(function() {
		var _this = $(this);
		_this.click(function() {
			if(!_this.hasClass("current")) {
				_sTxt.html(_this.children("a").text());
				_this.addClass("current").siblings().removeClass("current");
				filterTopic(_this.children("a").attr("name"));
			};
			_sOl.hide();
		})
	})
}


function filterTopic(condition){
	if(condition=="all"){
		filterParam="";
	}else{
		filterParam=("&"+condition+"=1");
	}
	getAllTopic(topicType,1);
}