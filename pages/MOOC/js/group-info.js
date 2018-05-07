/*
*退出小组
*/
function exitGroup(groupId){
	if(isLogin()){
		dialogFun("删除提示","确认要退出这个小组吗?",2,"javascript:void(0)\" onclick=\"toExitGroup("+groupId+")");
	}else{
		lrFun();
	}
}

function toExitGroup(groupId){
	$.ajax({
	    type: 'post',
	    url: baselocation+"/groupMember/ajax/exit/"+groupId,
	    data: {
	    },
	    dataType:"json",
	    async:false,
	    success: function(result) {
	        if(result.success==true){
	        	dialogFun("操作提示","退出小组成功",1);
	        }else{
	        	dialogFun("操作提示",result.message,0);
	        }
	    }
	});
}