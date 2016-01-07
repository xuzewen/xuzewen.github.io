$(function(){
	var oMain=document.getElementById('main');
	var aScreen=oMain.getElementsByClassName('page');
	var nowPage = 0; //当前屏数
	var readyWheel = true; 
	var scrollDir=true;
	
	addMouseWheel(oMain,function(down){
		if(!readyWheel) return;
		if(down){//下
			nowPage++;
			scrollDir=true;
			if(nowPage >= aScreen.length-1){
				nowPage = aScreen.length-1;
			}
			tab(nowPage,scrollDir);
		}else{//上
			nowPage--;
			scrollDir=false;
			if(nowPage<=0){
				nowPage = 0;
			}
			tab(nowPage,scrollDir);
		}
	});
	function tab(nowPage,scrollDir){
		if(!readyWheel) return;
		readyWheel = false;
		if(scrollDir){
			move(aScreen[nowPage-1],{'top':-aScreen[0].offsetHeight},{fn:function(){
				readyWheel = true;
			}});
		}else{
			move(aScreen[nowPage],{'top':0},{fn:function(){
				readyWheel = true;
			}});
		}
	}
	
});