// JavaScript Document
var $ = domReady;
function rnd(n, m) {
	return Math.random() * (m - n) + n;
}
function domReady(fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {
		document.attachEvent('onreadystatechange', function () {
			if (document.readyState == 'complete') {
				fn();
			}
		});
	}
}
function cSize(obj) {
	obj.width = window.innerWidth;
	obj.height = window.innerHeight;
}
function a2r(n) {
	return n * Math.PI / 180;
}
function r2a(n) {
	return n * 180 / Math.PI;
}
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, 0)[attr];
}
//滚轮事件
function addMouseWheel(obj, fn) {
	if (navigator.userAgent.indexOf('Firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', fnWheel, false);
	} else {
		obj.onmousewheel = fnWheel;
	}
	function fnWheel(ev) {
		var oEvt = ev || event;
		var down = false;
		if (oEvt.wheelDelta) {
			down = oEvt.wheelDelta < 0 ? true : false;
		} else {
			down = oEvt.detail > 0 ? true : false;
		}
		fn(down);
		oEvt.preventDefault && oEvt.preventDefault();
		return false;
	}
}
//运动函数封装
function move(obj, json, optional) {
	optional = optional || {};
	optional.time = optional.time || 700;
	optional.type = optional.type || 'ease-out';
	var start = {};
	var dis = {};
	for (var key in json) {
		start[key] = parseFloat(getStyle(obj, key));
		dis[key] = json[key] - start[key];
	}
	var count = Math.round(optional.time / 30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		n++;
		for (var key in json) {
			switch (optional.type) {
				case 'linear':
					var a = n / count;
					var cur = start[key] + dis[key] * a;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[key] + dis[key] * a * a * a;
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[key] + dis[key] * (1 - a * a * a);
					break;
			}
			if (key == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else {
				obj.style[key] = cur + 'px';
			}
		}
		if (n == count) {
			clearInterval(obj.timer);
			optional.fn && optional.fn();
		}
	}, 30);
}
