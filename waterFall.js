/* 
 * @name 瀑布流原生js插件
 * @author Jelon Cheung
 * @date 2014-6-3
 * @copyright http://jelon.in
 * @description 瀑布流特效
 * @version 0.1
 * @param	{object}	options					配置参数
 * @param	{object}	options.container 		瀑布流容器
 * @param	{string}	options.itemsClsName	数据块类名
 * @param	{string}	options.imgUrl			图片目录
 * @paran	{Array}		options.data 			瀑布流数据
 * @param	{number}	options.colNum			瀑布流列数
 * @param	{number}	options.colWidth		每列数据块宽度
 *
 * @example
 *		var waterFall = new WaterFall({ 
 *			container: document.getElementById('container'),	
 *			itemClsName: 'item',			
 *			imgUrl: 'images/', 			
 *			data: json.data,			
 *			colNum: 1,						
 *			colWidth: 240 					
 *		}); 
 */
;(function(win, doc) {
	var $$ = function(id) {
		return doc.getElementById(id);
	};

	var WaterFall = function(options) {
		this.container = $$('container');	//瀑布流容器
		this.itemClsName = 'item';			//数据块类名
		this.imgUrl = 'images/'; 			//图片目录
		this.data = json.data;				//瀑布流数据

		this.colNum = 1;					//瀑布列数
		this.colWidth = 240; 				//每列宽度

		this.init(options);
	};

	/* 扩展参数 */
	WaterFall.prototype.extend = function(obj) {
		var _this = this;

		_this.container = obj.container ? obj.container : _this.container;
		_this.itemClsName = obj.itemClsName ? obj.itemClsName : _this.itemClsName;
		_this.imgUrl = obj.imgUrl ? obj.imgUrl : _this.imgUrl;
		_this.data = obj.data ? obj.data : _this.data;
		_this.colNum = obj.colNum ? obj.colNum : _this.colNum;
		_this.colWidth = obj.colWidth ? obj.colWidth : _this.colWidth;
	};
	
	/* 初始化 */
	WaterFall.prototype.init = function(options) {
		var _this = this;
		_this.extend(options);

		_this.initData();
		var timer = setInterval(function() {
			_this.createFall();
		}, 400);
		
		//触发scroll
		win.onscroll = function() {
			clearInterval(timer);
			timer = null;

			_this.scroll();
			_this.createFall();
		};
		//重置窗口自适应
		win.onresize = function() {
			_this.createFall();

		};

	};

	/* 初始化数据 */
	WaterFall.prototype.initData = function() {
		var _this = this;
		_this.colNum = Math.floor(doc.documentElement.clientWidth/_this.colWidth);

		for (var i = 0; i < _this.data.length; i++) {
			var div = doc.createElement('div');
			div.className = _this.itemClsName;
			
			div.innerHTML = '<a href="javascript: void(0);">'
						+ 		'<img src="' + _this.imgUrl + 'P_' + _this.data[i].src + '" >'
						+ 		'<p class="desc">图片' + _this.data[i].src + '</p>'
						+ 	'</a>';

			_this.container.appendChild(div);

		}
	};

	/* 获取数据块 */
	WaterFall.prototype.getItems = function() {
		var _this = this;
		return _this.container.getElementsByClassName(_this.itemClsName);
	};

	/* 滚动加载 */
	WaterFall.prototype.scroll = function() {
		var _this = this;

		//判断加载条件
		if (_this.isScroll() && _this.data.length) {
			for (var i = 0, len = _this.data.length; i < len; i++) {

				var div = doc.createElement('div');
				div.className = _this.itemClsName;
				div.innerHTML = '<a href="javascript: void(0);">'
							+ 		'<img src="' + _this.imgUrl + 'P_' + _this.data[i].src + '" >'
							+ 		'<p class="desc">图片' + _this.data[i].src + '</p>'
							+ 	'</a>';
				_this.container.appendChild(div);

			}

		}

	};

	/* 创建瀑布流 */
	WaterFall.prototype.createFall = function() {

		var _this = this,
			items = _this.getItems(),
			hArr = [],
			minH = 0,		//最小高度
			minIndex = 0;	//最小高度的下标	

		_this.colWidth = items[0].offsetWidth || _this.colWidth;
		_this.colNum = Math.floor(doc.documentElement.clientWidth/_this.colWidth) || _this.colNum;

		_this.container.style.cssText = 'width:' + _this.colWidth*_this.colNum + 'px;margin:0 auto;';

		for (var i = 0, len = items.length; i < len; i++) {

			if (i < _this.colNum) {
				hArr.push(items[i].offsetHeight);

				//解决重置窗口大小`窗口由小变大`情况，
				//首行数据块定位问题
				items[i].style.position = '';
				items[i].style.top = '';
				items[i].style.left = '';
			} else {
				minH = Math.min.apply(null, hArr);
				minIndex = _this.indexOf(hArr, minH);

				//设置数据块定位
				items[i].style.position = 'absolute';
				items[i].style.top = minH + 'px';
				items[i].style.left = items[minIndex].offsetLeft + 'px';

				hArr[minIndex] += items[i].offsetHeight;
			}
		}

	};

	/* 获取值对应的下标 */
	WaterFall.prototype.indexOf = function(arr, val) { 
		for (var i in arr) {
			if (arr[i] === val) return i;
		}

	};

	/* 检测是否具备了滚动加载条件 */
	WaterFall.prototype.isScroll = function() {
		var _this = this,
			items = _this.getItems(),
			lastItemH = items[items.length-1].offsetTop + Math.floor(items[items.length-1].offsetHeight/2);

		var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
			height = doc.body.clientHeight || doc.documentElement.clientHeight;	//非标准浏览器下||标准浏览器下

		return lastItemH < scrollTop + height;
	};

	 win.WaterFall = WaterFall;


})(window, document);
