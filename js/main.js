$(function(){
	var oMain=document.getElementById('main');
	var aScreen=oMain.getElementsByClassName('page');
	var oSide=document.getElementById('side');
	var aDot=oSide.children;
	var nowPage = 0; //当前屏数
	var readyWheel = true; 
	var scrollDir=true;
	
	for(var i=0;i<aDot.length;i++){
		(function(index){
			aDot[index].onclick=function(){
				if(index>nowPage){
					nowPage=index;
					tab(nowPage,true);
				}else{
					nowPage=index;
					tab(nowPage,false);	
				}
			};
		})(i)
	}
	addMouseWheel(oMain,function(down){
		if(!readyWheel) return;
		if(down){//下
			nowPage++;
			scrollDir=true;
			if(nowPage>=aScreen.length-1){
				nowPage=aScreen.length-1;
			}
			tab(nowPage,scrollDir);
		}else{//上
			nowPage--;
			scrollDir=false;
			if(nowPage<=0){
				nowPage=0;
			}
			tab(nowPage,scrollDir);
		}
	});
	function tab(nowPage,scrollDir){
		if(!readyWheel) return;
		readyWheel=false;
		for(var i=0;i<aDot.length;i++){
			aDot[i].className='';	
		}
		aDot[nowPage].className='cur';
		if(scrollDir){
			for(var i=0;i<aScreen.length;i++){
				if(i<nowPage){
					move(aScreen[i],{'top':-aScreen[0].offsetHeight},{fn:function(){
						readyWheel = true;
					}});
				}
			}
		}else{
			for(var i=0;i<aScreen.length;i++){
				if(i>=nowPage){
					move(aScreen[i],{'top':0},{fn:function(){
						readyWheel = true;
					}});
				}
			}
		}
	}
	
});