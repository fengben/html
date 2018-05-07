/*pop card 15-11-06*/
	var browserRedirect = function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			return false;
		} else {
			var init = function() {
				this.allNodes = $("*",document.body);
				this.nLength = this.allNodes.length;
				this.popEle = this.nodeArr = this.cardArr = [];

				this.calculate();
				this.start();
			};
			init.prototype = {
				_id : "S_box_pop",
				_rel : "popUserCard",
				agoUserId : 0,
				disX : 0,
				dixY : 0,
				_timers : [],

				calculate : function() {
					for (var i = 0; i < this.nLength; i++) {
						this.nodeArr = this.allNodes[i];
						if (this.nodeArr.rel && this.nodeArr.rel === this._rel) {
							this.popEle.push(this.nodeArr);
						};
					};
					return this.popEle;
				},
				start : function() {
					var __this = this;
					var _popId = $('#'+__this._id);
					cardArr = this.calculate();
					$.each(cardArr, function() {
						var _this = $(this);
						_this.bind("mouseover", function(e) {
							e.stopPropagation();
							__this.clearTimer();
							var _popId = $('#'+__this._id);
							if (_popId && _popId.length > 0) {
								_popId.show();
								__this.positionPop(_this,_popId); //定位
								__this.clearTimer();
								if (_popId.attr("popUserId") != _this.attr("userInfoId")) {
									__this.getUserInfo(_this.attr("userInfoId"));
								}
							} else {
								__this.createModal();
								var _popId = $('#'+__this._id);
								__this.appendData();
								__this.getUserInfo(_this.attr("userInfoId"));
								__this.positionPop(_this,_popId); //定位
								_popId.unbind().bind("mouseover",function(e) {
									e.stopPropagation();
									__this.clearTimer();
								})
								__this.clearTimer();

								$(document).unbind().bind("mouseover", function(e) {
									e.stopPropagation();
									__this.clearTimer();
									__this.removePop();
								});
							};
						});
					});
				},
				createModal : function() {
					var __this = this;
					var cssArr = 'background: #fff;border: 1px solid #CBCBCB;box-shadow: 0 0 5px rgba(0,0,0,.1);width: 360px;height: 280px;position: relative;';
					var modalHTML = '';
						modalHTML += '<div id="" class="pa S_layer_pop"><div class="S_pop_wrap">';
						modalHTML += '<aside class="arrow"></aside>';
						modalHTML += '<div id="appedDataWrap" class="apd-sPop">资料卡内容</div>';
						modalHTML += '</div></div>';
					$("body").append(modalHTML);
					$(".S_pop_wrap").css({
						"background" : "#fff",
						"border" : "1px solid #CBCBCB",
						"box-shadow" : "0 0 25px rgba(0,0,0,.1)",
						"width" : "320px",
						"position" : "relative"
					}).parent().attr("id",this._id).addClass("delay0d5s fadeInUp");
				},
				appendData : function() {
					var __this = this;
					var _popId = $('#'+__this._id);
					var _apDataWrap = _popId.find("#appedDataWrap");
					var _loading = '<aside class="u-pop-loading"><img src="/static/gro/loading.gif" class="vam" alt="加载中"><s class="fsize12 c-333 vam ml10">数据努力加载中...</s></aside>';
					var myDate = new Date();
					var	_gDay = myDate.getDay()+1;
					var dataEle = '';
						//加讲师标识dataEle += '<div class="ucHead" style="background-image:url(/static/gro/img/ucBg/ucHeadBg-'+_gDay+'.jpg);"><a href="" class="ucFace"><img class="ucFace-img popUserImg" src="/static/gro/img/avatar-boy.gif" /><img title="机构认证讲师" src="/static/gro/img/T.png" width="16" height="16" class="ucFace-t vam" /></a>';
					dataEle += '<div class="ucHead" style="background-image:url(/static/gro/img/ucBg/ucHeadBg-'+_gDay+'.jpg);"><a href="javascript:void(0)" onclick="" class="ucFace"><img class="ucFace-img popUserImg" src="/static/gro/img/avatar-boy.gif" /></a>';
						//加等级dataEle += '<h6 class="hLh20 txtOf"><a href="" class="fsize12 c-fff vam popUserName"></a><em title="boy" class="sex boy vam popUserGender">&nbsp;</em><s style="background-position: -72px center;" title="等级：LV.2" class="u-grade vam ml10" id="levelSpan"></s></h6>';
					dataEle += '<h6 class="hLh20 txtOf"><a href="javascript:void(0)" onclick="" class="fsize12 c-fff vam popUserName"></a><em title="boy" class="sex boy vam popUserGender">&nbsp;</em></h6>';
						dataEle += '<h6 class="hLh20 txtOf"><span class="fsize12 c-fff vam popUserInfo">签名：也就那么回事情，就是想玩下玩下了</span></h6></div>';
						dataEle += '<div class="pd15 of"><div class="mt10"><ol class="uc-attr clearfix">';
						dataEle += '<li><span class="fsize14 c-333 popUserFansNum">0</span><span class="fsize12 c-999">粉丝</span></li>';
						dataEle += '<li><span class="fsize14 c-333 popUserAttenionNum">0</span><span class="fsize12 c-999">关注</span></li>';
						dataEle += '<li><span class="fsize14 c-333 popUserTopicNum">0</span><span class="fsize12 c-999">话题</span></li>';
						dataEle += '</ol><p class="clear"></p></div>';
						dataEle += '<div class="hLh30 tac"><a href="javascript:void(0)" class="cBtn uc-btn guanzhubutton">关 注</a><a href="javascript:void(0)" onclick="" class="cBtn uc-btn ml10 popSendPriMsg">发私信</a></div>';
						dataEle += '<div class="uc-group-show of"><dl class="clearfix"><dt><span class="fsize12 c-666">小组</span></dt><dd class="ml10 popUserGroups""></dd></dl></div>';
						dataEle += '</div>';
					_apDataWrap.empty().append(dataEle);
				},
				getUserInfo : function(userId) {
					var __this = this;
					var _popId = $('#'+__this._id);
					_popId.attr("popUserId",userId);
					if(__this.agoUserId!=userId){
						$.ajax({
					        url : "/user/ajax/queryuser/"+userId,
					        data : {},
					        type : "post",
					        dataType : "json",
					        cache : true,
					        async : false,
					        success : function(result) {
					            if(result.success){
					            	__this.agoUserId=userId;
					                var entity = result.entity;
					                if(isNotNull(entity)){
					                    //放置数据
					                    if( entity && entity.displayName && isNotEmpty(entity.displayName)){//昵称
					                        $("#S_box_pop .popUserName").html( entity.displayName);
					                        $("#S_box_pop .popSendPriMsg").attr("onclick",'dialogFun("发私信","'+entity.displayName+'",3,'+userId+');');
					                    }else{
					                        $("#S_box_pop .popUserName").html(entity.email);//邮箱
					                        $("#S_box_pop .popSendPriMsg").attr("onclick",'dialogFun("发私信","'+entity.email+'",3,'+userId+');');
					                    }
					                    
					                    //性别
					                    var gender = entity.sex;
					                    if(gender==0){
					                        $("#S_box_pop .popUserGender").removeClass("girl").addClass("boy");
					                    }else{
					                    	$("#S_box_pop .popUserGender").removeClass("boy").addClass("girl");
					                    }
					                    
					                    //个性签名
					                    var userInfo = entity.userInfo;
					                    if(userInfo!=null&&userInfo!=''){
					                        $("#S_box_pop .popUserInfo").html("签名："+userInfo).attr("title",userInfo);
					                    }else{
					                    	$("#S_box_pop .popUserInfo").html("签名：这个家伙很懒，还没有签名~~~").attr("title","这个家伙很懒，还没有签名~~~");
					                    }

					                    if(entity.picImg && isNotEmpty(entity.picImg)){
					                        $("#S_box_pop .popUserImg").attr("src",staticServer+entity.picImg);
					                    }else{
					                    	$("#S_box_pop .popUserImg").attr("src","/static/gro/img/avatar-boy.gif");
					                    }
					                    
					                    $("#S_box_pop .popUserImg").parent().attr("onclick","toBrowseUserCenter("+userId+")");
					                    $("#S_box_pop .popUserName").attr("onclick","toBrowseUserCenter("+userId+")");
										//关注
										$("#S_box_pop .guanzhubutton").attr("href","javascript:toAttention("+userId+")");

					                    $("#S_box_pop .popUserTopicNum").html(result.topicNum);
					                    $("#S_box_pop .popUserActNum").html(result.activityNum);
					                    $("#S_box_pop .popUserAttenionNum").html(result.attentionNum);
					                    $("#S_box_pop .popUserFansNum").html(result.fansNum);

					                    var groupList=result.groupList;
					                    var groupHtml="";
					                    if(groupList!=""&&groupList!=null){
					                    	for(var i=0;i<groupList.length;i++){
					                    		var groupImg="/static/gro/img/pic/1.jpg";
					                    		if(groupList[i].imageUrl!=""){
					                    			groupImg=staticServer+groupList[i].imageUrl;
					                    		}
					                    		groupHtml+='<a title="'+groupList[i].groupName+'" href="/group/groupInfo/'+groupList[i].groupId+'"><img alt="" src="'+groupImg+'"></a>';
					                    	}
					                    	$("#S_box_pop .popUserGroups").html(groupHtml);
					                    }else{
					                    	$("#S_box_pop .popUserGroups").html("<p class='hLh20 of'><span class='fsize12 c-666'>还没有加入任何小组！</span></p>");
					                    }
										$(".popcardguanzhu").click(function(){
											toAttention(userId);
										});
					                }
					            }
					        }
					    });
					}
				},
				positionPop : function($ref,$target) {
					var __this = this,
					 	_popId = $('#'+__this._id),
					 	scrollTop,
						scrollLeft,
						windowHeight,
						windowWidth,
						refOffset,
						refHeight,
						refWidth,
						targetTop,
						targetLeft,
						targetHeight,
						targetWidth,
						originTop,
						originRight,
						originBottom,
						originLeft,
						arrowPositon,//箭头方向
						arrowSize = 5,
						mlr = 15,
						isPosition = false;
						
					scrollTop = $(document).scrollTop();
					scrollLeft = $(document).scrollLeft();
					windowHeight = $(window).height();
					windowWidth = $(window).width();
					refOffset = $ref.offset();
					refHeight = $ref.outerHeight();
					refWidth = $ref.outerWidth();
					targetHeight = $target.outerHeight();
					targetWidth = $target.outerWidth();
					
					//定位显示的位置
					if(refOffset.top - scrollTop - targetHeight - arrowSize>= 0){//上
						if(windowWidth + scrollLeft - refOffset.left - targetWidth >= 0){//上右
							targetTop = refOffset.top - targetHeight - arrowSize;
							targetLeft = refOffset.left;
							isPosition = true;
							arrowPositon = "b";
						}else if(refOffset.left + refWidth -scrollLeft - targetWidth >=0){//上左
							targetTop = refOffset.top - targetHeight - arrowSize;
							targetLeft = refOffset.left + refWidth - targetWidth;
							isPosition = true;
							arrowPositon = "b";
							_popId.find('.arrow').css({left: 'auto',right: '20px'});
						}
					}
					
					if(!isPosition){
						if(windowHeight - (refOffset.top + refHeight - scrollTop) - targetHeight - arrowSize >= 0){//下
							if(windowWidth + scrollLeft  - refOffset.left - targetWidth >= 0){//下右
								targetTop = refOffset.top + refHeight + arrowSize;
								targetLeft = refOffset.left;
								isPosition = true;
								arrowPositon = "t";
							}else if(refOffset.left + refWidth -scrollLeft - targetWidth >=0){//下左
								targetTop = refOffset.top + refHeight + arrowSize;
								targetLeft = refOffset.left + refWidth - targetWidth;
								isPosition = true;
								arrowPositon = "t";
								_popId.find('.arrow').css({left: 'auto',right: '20px'});
							}
						}
					}
					
					
					if(!isPosition){
						if(windowWidth + scrollLeft - refOffset.left - refWidth - targetWidth - arrowSize>= 0){//右
							if(refOffset.top + refHeight - scrollTop - targetHeight >= 0){//右上
								targetTop = refOffset.top + refHeight - targetHeight;
								targetLeft = refOffset.left + refWidth + arrowSize;
								isPosition = true;
								arrowPositon = "l";
								_popId.find('.arrow').css({top: 'auto', bottom: '20px'});
							}else if(refOffset.top + windowHeight - scrollTop - targetHeight>= 0){//右下
								targetTop = refOffset.top;
								targetLeft = refOffset.left + refWidth + arrowSize;
								isPosition = true;
								arrowPositon = "l";
							}
						}
					}
					
					if(!isPosition){
						if(refOffset.left - scrollLeft - targetWidth - arrowSize>=0){//左
							if(windowHeight - (refOffset.top - scrollTop) - targetHeight >= 0){//左下
								targetTop = refOffset.top;
								targetLeft = refOffset.left - targetWidth -arrowSize;
								isPosition = true;
								arrowPositon = "r";
							}else if(refOffset.top + refHeight - scrollTop - targetHeight >= 0){//左上
								targetTop = refOffset.top + refHeight - targetHeight;
								targetLeft = refOffset.left - targetWidth - arrowSize;
								isPosition = true;
								arrowPositon = "r";
								_popId.find('.arrow').css({top: 'auto', bottom: '20px'});
							} 
						}
					}
					
					if(!isPosition){
						//特殊情况定位(非最大化情况下)
						//计算原点与浏览器视窗边缘的距离
						originTop = refOffset.top - scrollTop + refHeight/2;
						originBottom = windowHeight - originTop;
						originLeft = refOffset.left - scrollLeft + refWidth/2;
						originRight = windowWidth - originLeft;
						
						if(originTop >= originBottom ){
							if(originRight >= originLeft){
								if(originTop < targetHeight && originRight >= targetWidth){//右上
									targetTop = refOffset.top + refHeight - targetHeight;
									targetLeft = refOffset.left + refWidth + arrowSize;	
									arrowPositon = "l";
									_popId.find('.arrow').css({top: 'auto', bottom: '20px'});
								}else{//上右
									targetTop = refOffset.top - targetHeight - arrowSize;
									targetLeft = refOffset.left;
									arrowPositon = "b";
								}
							}else{
								if(originTop < targetHeight && originLeft >= targetWidth){//左上
									targetTop = refOffset.top + refHeight - targetHeight;
									targetLeft = refOffset.left - targetWidth - arrowSize;
									arrowPositon = "r";
									_popId.find('.arrow').css({top: 'auto', bottom: '20px'});
								}else{//上左
									targetTop = refOffset.top - targetHeight - arrowSize;
									targetLeft = refOffset.left + refWidth - targetWidth;
									arrowPositon = "b";
									_popId.find('.arrow').css({left: 'auto',right: '20px'});
								}
							}
						}else{
							if(originRight >= originLeft){
								if(originBottom < targetHeight && originRight >= targetWidth){//右下
									targetTop = refOffset.top;
									targetLeft = refOffset.left + refWidth + arrowSize;		
									arrowPositon = "l";
								}else{//下右
									targetTop = refOffset.top + refHeight + arrowSize;
									targetLeft = refOffset.left;
									arrowPositon = "t";
								}
							}else{
								if(originBottom < targetHeight && originLeft >= targetWidth){//左下
									targetTop = refOffset.top;
									targetLeft = refOffset.left - targetWidth - arrowSize;
									arrowPositon = "r";
								}else{//下左
									targetTop = refOffset.top + refHeight + arrowSize;
									targetLeft = refOffset.left + refWidth - targetWidth;
									arrowPositon = "t";
									_popId.find('.arrow').css({left: 'auto',right: '20px'});
								}
							}
						}
						
						isPosition = true;	
					}
					
					_popId.find('.arrow').removeClass().addClass('arrow arrow_' + arrowPositon);
					
					if(isPosition){
						$target.css({
							top: targetTop,
							left: targetLeft
						});
					}
				},
				removePop : function() {
					var __this = this;
					var _popId = $('#'+__this._id);
					if (_popId.is(":visible")) {
						//_popId.removeClass("fadeInUp").addClass("fadeOutDown");
						var pTimer = setInterval(function() {
							_popId.hide();
							__this.clearTimer();
						}, 10);
						__this._timers.push(pTimer);
					};
				},
				clearTimer : function(){
					var cTimers = this._timers;
					for(var i=0; i<cTimers.length; i++){
						if(cTimers[i]){
							clearInterval(cTimers[i]);
						}
					};
					this._timers = [];
				}
			};
			new init();
		};
	};
	new browserRedirect();