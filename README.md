waterFall v0.1
=========


===============
    瀑布流插件相关信息：
    作者 Jelon Cheung
    日期 2014-6-3
    主页 http://jelon.in
    版本 0.1
    
===============
    插件参数说明：
    参数	{object}	options					配置参数
    参数	{object}	options.container 		瀑布流容器
    参数	{string}	options.itemsClsName	数据块类名
    参数	{string}	options.imgUrl			图片目录
    参数	{Array}		options.data 			瀑布流数据
    参数	{number}	options.colNum			瀑布流列数
    参数	{number}	options.colWidth		每列数据块宽度
    
==============
    插件使用实例：
    window.onload = function() {
     	var waterFall = new WaterFall({ 
     		container: document.getElementById('container'),	
     		itemClsName: 'item',			
     		imgUrl: 'images/', 			
     		data: json.data,			
     		colNum: 1,						
     		colWidth: 240 					
     	}); 
 	};
