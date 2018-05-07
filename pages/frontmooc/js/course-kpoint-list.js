//播放来源 1 课程详情 2 播放大厅
var playFromType=$("#playFromType").val();
var courseId=$("#courseId").val();
var countPlayTimeOut='20';//播放后 天假播放播放记录的延时（单位秒）
var setTimeoutflag;//定时
var videoPlayHtml;//id videoPlay 初始化的html
var infoHeight;
$(function(){
	videoPlayHtml=$("#videoPlay").html();
	infoHeight = $(".cou-in-boc").height();
	if(playFromType==2&&goBack!="true"){
		//播放指定章节
		if(playKpointId!="0"){
			$("#playKpointId"+playKpointId).click();
			//$("#playKpointId"+playKpointId).parent().parent("ol").prev().click();//展开父节点
		}else{
			// 播放第一个视频节点
			if ($("#lh-menu-new").find("ul>li:eq(0)").find("ol").size()>0){
				/*如果目录是2级*/
				$("#lh-menu-new").find("ul>li:eq(0)").find("ol>li:eq(0)").find("a").click();
			}else {
				/*如果目录只有一级*/
				$("#lh-menu-new").find("ul>li:eq(0)").find("a").first().click();
			}
			//$("#lh-menu").find("ul>li:eq(0)").find("a").parent().parent("ol").prev().click();//展开父节点
		}
	}
});
/*跳转播放大厅*/
function toVideoPlayer(url) {
	if(!isLogin()){
		lrFun();

	}else {
		window.open(url)
	}
}

//播放处理
var playerReload=false;

/**
 * 获得播放器的html
 */
function getPlayerHtml(kpointId,obj,kpointName) {
	if(!isLogin()){
		lrFun();
		return;
	}
	//播放大厅 切换 章节时，如果是因酷云视频 ，记录章节的最后播放时间
	if(playFromType==2 && isNotEmpty(videotype) && videotype=="INXEDUCLOUD" && isNotEmpty(fileType) && fileType=="VIDEO" && isNotEmpty(currentKpointId+"") && parseInt(currentKpointId)>0) {//播放大厅 并且 因酷云视频
		addPlayTimes(courseId ,currentKpointId);
        //清除定时
        clearInterval(timer_INXEDUCLOUD);
	}
    //切换 章节时，如果是因酷云视频 ，重新加载页面（播放器重新加载异常处理）
    if(playFromType==2 && isNotEmpty(videotype) && videotype=="INXEDUCLOUD" && isNotEmpty(fileType) && fileType=="VIDEO") {
        playerReload=true;
        window.location.href=baselocation+'/uc/play/'+courseId+"/"+kpointId;
        return;
    }

	/*章节id*/
	playKpointId = kpointId;
	// 移除一级节点选中
	//$("#lh-menu-new").find("ul li").removeClass("current-2");
	// 移除二级节点选中
	$("#lh-menu-new").find("ol>li>div").removeClass("cur");
	//选中当前节点
	$(obj).parent().addClass("cur");
	currentKpointId = kpointId;

	$.ajax({
		url: "/front/ajax/checkKpoint",
		data: {
			"kpointId": kpointId,
			"playFromType":playFromType
		},
		type: "post",
		dataType: "text",
		cache: false,
		async: false,
		success: function (result) {

			if(checkIsMobile()){ // 移动端环境下效果
				//音频播放 单独还原设置  播放器高度动态赋值
				var wH = parseInt(document.documentElement.clientHeight, 10);
				//$("#p-h-box").css("height", wH - 258);
				$("#p-h-r-cont").css("height", wH - 363);
				$(".p-h-video").css("height", wH - 330);
			}

			/*是否覆盖*/
			if(result.indexOf("noCover=true")==-1){
				$("#videoPlay").html(result);

			}else{
				$("#videoPlay").html(videoPlayHtml);
				$("#videoPlay").append(result);
			}
			if(playFromType==2&&result.indexOf("/paper/toExamPaper/")!=-1){//考试
				$("#videoPlay").next().html('<img src="/static/inxweb/img/in-exam.png"><p class="hLh20"><span style="color: #A6B8CC;">课后作业，考试中...</span></p>');
			}else{
				$("#videoPlay").next().html('<img src="/static/inxweb/img/v-loading.gif"><p class="hLh20"><span style="color: #A6B8CC;">加载中...</span></p>');
			}

			if(playFromType==2){//播放大厅
				// 添加播放记录
                clearTimeout(setTimeoutflag);
				setTimeoutflag = setTimeout('addPlayTimes(' + courseId + ',' + kpointId + ')', Number(countPlayTimeOut) * 1000);
				$("#contentTitle").text(kpointName);

				//根据当前播放章节，查询笔记
                queryNote(kpointId,courseId);

				//查询评论
				playerVideoQueryCommentList(courseId);

				otherId = kpointId;//章节id用于评论
				if(!checkIsMobile()) {// 不是移动端环境下，先查询评论
					queryComment();// 查询章节评论
				}
				//关闭页面时 保存最后的播放时长
				window.onbeforeunload = function(){
					if(!checkIsMobile()&&videotype=="INXEDUCLOUD"&&fileType=="VIDEO"){//因酷云视频
						addPlayTimes(courseId ,kpointId);
					}
				}
			}
		},
		error: function (error) {
			dialog('提示', '系统繁忙，请稍后再操作', 1);
		}
	});
}

/**
 * 记录播放次数
 *
 * @param courseId
 *            课程id
 * @param kpointId
 *            节点id
 */
function addPlayTimes(courseId, kpointId) {
	try {
        var playTime;
        var totalTime;
        if(isNotEmpty(videotype) && videotype=="INXEDUCLOUD" && isNotEmpty(fileType) && fileType=="VIDEO" && objectPlayer!=null && objectPlayer!=''){//因酷云视频
            if(!checkIsMobile() && objectPlayer.currenttime()>0) {// 非移动端环境下,才能获取播放时间，才添加播放记录
                playTime=objectPlayer.currenttime();
                totalTime=objectPlayer.totalfiletime();
            }else{
                return;
            }
        }

        $.ajax({
            url : baselocation + "/couserStudyHistory/ajax/playertimes",
            data : {
                "kpointId" : kpointId,
                "courseId" : courseId,
                "playTime" : playTime,
                "totalTime" : totalTime
            },
            type : "post",
            dataType : "text",
            async : false,
            success : function(result) {
            }
        });
	}catch (e){
        console.error(e);
	}
}

