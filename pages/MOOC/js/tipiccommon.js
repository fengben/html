/* 话题点赞 */
var topicMark = 0;
function topicPraise(topicId) {

    if (topicMark == 0) {
        $.ajax({
            //url: baselocation + "/ajax/topicPraise",
            url: homeAddress() + "one/mainmooc/likePost.template",
            type: 'post',
            async: false,
            dataType: 'json',
            data: {
                'id': topicId,// staff@qq.com   template里面@被替换成了%40
            },
            success: function (result) {
                // alert(result)
                if (result) {
                    var n = $("#topicPraise").text();
                    n++;
                    $("#topicPraise").text(n);
                    $(".topic.numb.zan").attr("title", "点赞 " + n).html('<em class="icon14"> </em>' + n);
                    topicMark = 1;
                    // dialogFun("提示信息", "亲，点赞成功", 5);
                    var _dznum = $(".dz-btn").find(".dz-num");
                    _dznum.stop().animate({"opacity": "0", "bottom": "90px"}, 1000, function () {
                        _dznum.css({"opacity": "1", "bottom": "-26px"})
                    });

                } else {
                    dialogFun("提示信息", "系统异常,请稍后重试", 1);
                }
            },
           error: function (jqXHR, textStatus, errorThrown) {
            // /*弹出jqXHR对象的信息*/
            // alert(jqXHR.responseText);
            // alert(jqXHR.status);
            // alert(jqXHR.readyState);
            // alert(jqXHR.statusText);
            // /*弹出其他两个参数的信息*/
            // alert(textStatus);
            // alert(errorThrown);
        }
        })
    } else {

        dialogFun("提示信息", "你已经点过赞了~~~", 5);
    }
}

/* 评论点赞 */

function commentPraise(id){
    var praisefalg = $("#commentPraise_"+id).attr("praisefalg");
    if (praisefalg != "1") {
        $.ajax({
            // url: baselocation + "/group/ajax/commentPraise",
            url: homeAddress() + "one/mainmooc/likePost.template",
            data: {"id": id},
            dataType: "json",
            type: "post",
            async: false,
            success: function (result){
                if (result) {
                    var n = $("#commentPraise_"+id).text();
                    n++;
                    $("#commentPraise_"+id).text(n);
                    $("#commentPraiseATitle_"+id).attr("title", "点赞 " + n);
                    dialogFun("提示信息", "亲，点赞成功~~~", 5);
                }
                $("#commentPraise_"+id).attr("praisefalg","1");
            }
        })
    } else {
        dialogFun("提示信息", "你已经点过赞了~~~", 5);
    }
}

//创建评论
function createComment(level, index, parentCommentId) {
    if (isLogin()) {
        var serialize = '';
        var commentContent = '';
        if (level == 'one') {
            //commentContent = $("#" + level + "CommentContent").val();
        	commentContent = $("#" + level + "Comment").find("textarea").val();
        } else {
            //commentContent = $("#" + level + "CommentContent" + index).val();
        	commentContent = $("#" + level + "Comment" + index).find("textarea").val();
        }
        if (commentContent == null || $.trim(commentContent) == "") {
            if (level == 'one') {
                $("#" + level + "CommentErrorMessage").html("你还没有输入任何内容！").show();
            } else {
                $("#" + level + "CommentErrorMessage" + index).html("你还没有输入任何内容！").show();
            }
            return;
        }
        else {
            if (level == 'one') {
                $("#" + level + "CommentErrorMessage").hide();
                serialize = $("#" + level + "Comment").serialize();
            } else {
                $("#" + level + "CommentErrorMessage" + index).hide();

                var textVal=$("#" + level + "Comment" + index).find("textarea").val();
                var hiddenVal=$("#" + level + "Comment" + index).find("textarea").next().val();
                $("#" + level + "Comment" + index).find("textarea").val("<p>"+hiddenVal+textVal.replace("<p>",""));
                serialize = $("#" + level + "Comment" + index).serialize();
            }
            $.ajax({
                url: baselocation + "/group/ajax/createComment",
                data: serialize,
                dateType: "json",
                type: "post",
                success: function (result) {
                    if (result.success) {
                        $(".replyCommentContent").each(function(){
                           var id = $(this).attr("id");
                           UE.delEditor(''+id);
                       });
                        if (level == 'one') {
                            topicCommentPaging();
                        } else {
                            //评论完后，隐藏评论输入框
                            showcommentHide('twoCommentShowHide', index, parentCommentId);
                            commentReplyPaging(parentCommentId);
                            var commentNum = $(".commentDto_comment_num_"+parentCommentId).html();
                            $(".commentDto_comment_num_"+parentCommentId).html(commentNum*1+1);
                        }
                    } else {
                        dialogFun("提示信息", result.message, 5);
                    }
                }
            })
        }
    } else {
        lrFun();
    }
    if (level == 'one') {
        $("#"+level+"CommentContent").val("");
        //KindEditor.html("#"+level+"CommentContent", '');
        var ue = UE.getEditor(level+"CommentContent");
        ue.setContent('<p></p>');
    } else {
        $("#" + level + "CommentContent" + index).val("");
        //KindEditor.html("#" + level + "CommentContent" + index, '');
        var ue = UE.getEditor(level + "CommentContent" + index);
        ue.setContent('<p></p>');
    }

}

//举报
function report(type,commentId){
    if(isLogin()){
        if($('input[name="reportType"]:checked').length == 0){
            $("#reportErrorMessage").html("请选择举报类型！");
            $("#reportErrorMessage").show();
            return;
        }else{
            $("#reportErrorMessage").hide();
        }
        var reportContent = $("textarea[name='reportContent']").val();
        if(reportContent == null || $.trim(reportContent) == ''){
            $("#reportErrorMessage").html("您还没有输入内容！");
            $("#reportErrorMessage").show();
            return;
        }else{
            $("#reportErrorMessage").hide();
        }
        $("#reportErrorMessage").hide();
        var reportType = $('input[name="reportType"]:checked').val();
        /*var reportType = '';
        $('input[name="reportType"]:checked').each(function(){
            reportType = reportType + $(this).val()+",";
        });
        reportType = reportType.substr(0,reportType.length-1);*/
        $.ajax({
            url:baselocation+"/report/addReport",
            data:{
                "report.topicId":topicId,
                "report.reportContent":reportContent,
                "report.reportState":1,
                "report.reportType":reportType,
                "report.type":type,
                "report.commentId":commentId
            },
            dataType:"json",
            type:"post",
            success:function(result){
                if(result.message == 'reportContent'){
                    $("#reportErrorMessage").show();
                    dialogFun("提示信息",result.message,0);
                }else{
                    dialogFun("提示信息",result.message,5);
                }
            }
        })
    }else{
        lrFun();
    }
}

//评论输入框隐藏显示
function showcommentHide(str,index,parentCommentId){
    //摧毁编辑器
    /*$(".replyCommentContent").each(function(){
        var id = $(this).attr("id");
        UE.delEditor(''+id);
    });*/

    //清楚全部的回复
    //$(".replyCommentListremove").html("");

    //隐藏其它编辑器
   $(".twoCommentAllHide").each(function(){
        var idstrfalg = $(this).attr("id");
        var idstr =  str+index;
        if(idstrfalg!=idstr){
            $(this).hide();
        }
    });


    $("#"+str+index).toggle();
    /*
    //加载回复
    commentReplyPaging(parentCommentId);
    initfrontUM("twoCommentContent"+index,"98.5%","95");*/


}
//评论输入框隐藏显示
function showHide(str,index,parentCommentId){
    $("#"+str+index).toggle();
   // commentReplyPaging(parentCommentId);
    //initfrontUM("replyCommentContent"+index,"98%","80");
}


//参加活动的人分页查询
function queryActivityJoinPage(pageNum){
    $.ajax({
        url:baselocation+"/activityJoin/queryActivityJoinPage",
        data:{
            "activityJoin.topicId":topicId,
            "page.currentPage":pageNum
        },
        dataType:"text",
        type:"post",
        async:false,
        success:function(result){
            $("#inActThePeopleList").html(result);
        }
    })
}

//ajax分页显示还踢评论
function topicCommentPaging(topicId) {
    ajaxPage("/group/ajax/topicCommentPaging/"+topicId+"", "", 1, topicCallBack);
}
//评论分页
function topicCallBack(result) {
    $("#commentList").html(result);
}
//评论下的评论分页
function commentReplyPaging(parentCommentId) {
    ajaxPageReply("/group/ajax/topicReplyCommentPaging/" + parentCommentId + "", "", 1, function(result){
        $("#replyCommentList"+parentCommentId).html(result);//回复的评论放到相应的评论下
    });
}

//参加活动
function inActivity(activityId){
	if(isLogin()){
		$.ajax({
			url:baselocation+"/activityJoin/inActivity",
			data:{
				"activityJoin.topicId":activityId,
				"activityJoin.state":1
			},
			dataType:"json",
			type:"post",
			async : false,
			success:function(result){
				if(result.success){
					var inNumber = $("#inNumber").html();
					inNumber++;
					$("#inNumber").html(inNumber);
					queryActivityJoinPage(1);
				}
				dialogFun("提示信息",result.message,5);
			}
		});
	}else{
		lrFun();
	}
};
//举报页
//话题/活动/评论举报
function goReportPage(id,type){
	if(isLogin()){
		dialogFun('举报信息',id,4,type);
	}else{
		lrFun();
	}
}

function isDelComment(commentId,type){
	dialogFun("删除提示","确认要删除吗?",2,"javascript:void(0)\" onclick=\"delComment('"+commentId+"','"+type+"')");
}

//删除
function delComment(id,type){
	$.ajax({
		url:baselocation+"/comment/ajax/delComment/"+id,
		data:{},
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.success){
				if(type==1){
					$("#commentPraiseATitle_"+id).parent().prev().html("----------------------------------------------<br>该评论已删除~~~<br>---------------------------------------------- ");
					$("#commentPraiseATitle_"+id).parent().find("a.delMarkClass").remove();
				}else{
					$("#replyCommentShowHide"+id).prev().prev().html("----------------------------------------------<br>该评论已删除~~~<br>---------------------------------------------- ");
					$("#replyCommentShowHide"+id).prev().find("a.delMarkClass").remove();
				}
				dialogFun("提示信息","删除成功",5);
			}else{
				dialogFun("提示信息",result.message,5);
			}
		}
	})
}
