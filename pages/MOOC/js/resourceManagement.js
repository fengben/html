//保持(被选中的)侧边栏高亮
function keepActive(){
    $("#a_resourceManagement").parent().addClass('active');
}
//左侧目录树以及刷新
function catalogue() {
    var treeDataSource = null;
    // 文件夹列表初始展示
    var allFilesMap = new Array();
    var allFilesMapResult = function () {
        //channelsToTreeData()函数是构造ace_tree树
        console.log(allFilesMap);
        var folderData = channelsToTreeData(allFilesMap);
        //treeDataSource是ace_tree的数据源
        
        treeDataSource = new DataSourceTree({data: folderData});
        jQuery(function($){
            $("#tree2").removeData("tree");
            //清空事件
            $("#tree2").unbind('click');
            $('#tree2').ace_tree({
                dataSource: treeDataSource ,
                multiSelect:false,
                loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin green"></i></div>',
                'open-icon' : 'icon-folder-open',
                'close-icon' : 'icon-folder-close',
                'selectable' : true,
                'selected-icon' : 'ace-icon fa fa-check',
                'unselected-icon' : 'ace-icon fa fa-times'
            });
        });
    }
    getFromWS("zyMooc/zyFileSpaceNew.template", allFilesMap, allFilesMapResult);
}
//右侧资源列表全部加载
function allFileList(){
    //文件浏览列表初始展示，用了bootstrap的datatable插件
    var allColumnsMap = new Array();
    var  allColumnsMapResult = function () {
        jQuery("#list").html(allColumnsMap[0]);
        if ($('#list').hasClass('dataTable')) {
            dttable = $('#list').dataTable();
            dttable.fnClearTable(); //清空一下table
            dttable.fnDestroy(); //还原初始化了的datatable
        }
        jQuery(function($){
            $('#list').dataTable({
                ordering:false,
                info: false,
                bAutoWidth: true,
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }

            });
        });
    }
    var paras = "operation=getAllFiles";
    getFromWS("zyMooc/zyFileListNew.template",paras, allColumnsMap, allColumnsMapResult);

}
jQuery(document).ready(function ($) {
    //根据classification的权限不同，从而展示不同的左侧边栏
    catalogue();
    allFileList();
    var html = new Array();
    var htmlResult = function(){
        $("#main-menu").append(html[0]);
        keepActive();
    }
    getFromWS("mainmooc/getNav.template","classification="+classification, html, htmlResult);
    $(".user-info-menu #loginName").html(loginName);
});


