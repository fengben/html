KindEditor.plugin('view', function(K) {
        var editor = this, name = 'view';
        // 点击图标时执行
        editor.clickToolbar(name, function() {

		$("#viewIFrame").contents().find("#row").html(editor.html());
		$("#viewIFrame").contents().find("#row img").removeAttr("width");
		$("#viewIFrame").contents().find("#row img").removeAttr("height");
		$("#viewIFrame").contents().find("#row img").removeAttr("style");
		$("#viewIFrame").contents().find("#row img").css("display","block");
		$("#viewIFrame").contents().find("#row img").css("margin-right","auto");
		$("#viewIFrame").contents().find("#row img").css("margin-left","auto");
		$("#viewIFrame").contents().find("#row img").css("max-width","99%");
		$("#viewIFrame").contents().find("#row img").css("height","auto");

		$("#viewIFrame").contents().find("#row embed").each(function(i){   
			$(this).wrapAll("<div style='padding-bottom:75%;position:relative;display:block;height:0;overflow:hidden;'></div>");
			if($(this).attr("autostart")){
				$(this).replaceWith("<video src='"+$(this).attr("src")+"' controls='true' autoplay='autoplay' style='width:100%;height:100%;position:absolute;top:0;bottom:0;left:0;border:0'></video>"); 
			}else{
				$(this).replaceWith("<video src='"+$(this).attr("src")+"' controls='true' style='width:100%;height:100%;position:absolute;top:0;bottom:0;left:0;border:0'></video>"); 
			}
		
		});
		$("#viewDiv").css("display","block");

        });
});
