// JavaScript Document
//var $=domReady;
function rnd(n,m){
	return Math.random()*(m - n) + n;
}
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn();	
			}
		});	
	}
}
function cSize(obj){
	obj.width=window.innerWidth;
	obj.height=window.innerHeight;
}
function a2r(n){
	return 	n*Math.PI/180;
}
