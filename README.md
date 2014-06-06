waterFall
=========

瀑布流原生js插件
===============

    author Jelon Cheung
    date 2014-6-3
    copyright http://jelon.in
    version 0.1
    param	{object}	options					配置参数
    param	{object}	options.container 		瀑布流容器
    param	{string}	options.itemsClsName	数据块类名
    param	{string}	options.imgUrl			图片目录
    paran	{Array}		options.data 			瀑布流数据
    param	{number}	options.colNum			瀑布流列数
    param	{number}	options.colWidth		每列数据块宽度
    
==============
    插件使用说明：
     	waterFall.init({ 
     		container: document.getElementById('container'),	
     		itemClsName: 'item',			
     		imgUrl: 'images/', 			
     		data: json.data,			
     		colNum: 1,						
     		colWidth: 240 					
     	}); 
