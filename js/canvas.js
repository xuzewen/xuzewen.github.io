function draw(){
	var aPoint = [];
	fontPos("images/click.png",ret,0);
	fontPos("images/hi.png",hi,6);
	fontPos("images/stranger.png",fr,12,42);
	fontPos("images/welcome.png",we,18,35);
	for(var i = 0; i < N; i++){
		aPoint[i] = {
			r:rnd(5,10),
			alpha:Math.random()*0.7+0.3,
			x:rnd(0,winW),
			y:rnd(0,winH),
			speedX:rnd(-0.3,0.3),
			speedY:rnd(-0.3,0.3)
		};
	}
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height);
		gd.fillStyle = "#009966";
		gd.fillRect(0,0,oC.width,oC.height);
		for(var i = 0; i < N; i++){
			if(state==6) setCircle(aPoint[i],i*(360/N));
			if(state==7) setLine(aPoint[i],i*(winW/(N-1)));
			if(state==9) setEight(aPoint[i],i*(720/N),i);
			if(state==2) setFont(aPoint[i],i,ret);
			if(state==3) setFont(aPoint[i],i,hi);
			if(state==4) setFont(aPoint[i],i,fr,42);
			if(state==5) setFont(aPoint[i],i,we,35);
			drawPoint(aPoint[i]);
			switch (state){
				case 0:
					move(aPoint,i);
				break;	
				case 1:
					move(aPoint,i);
					for (var b, j = i + 1; j < N; j++) {
						b = aPoint[j];
						spring(aPoint[i], b);
					}
				break;
				case 8:
					toTarget(aPoint,i,2);
					oC.onmousemove=function(ev){
						var X=ev.pageX;
						var Y=ev.pageY;
						aPoint[0].tx=X;
						aPoint[0].ty=Y;
						for(var i=1;i<N;i++){
							aPoint[i].tx=aPoint[i-1].x;
							aPoint[i].ty=aPoint[i-1].y;
						}
					};
				break;
				default:
					toTarget(aPoint,i);
					shake(aPoint,i);
				break;
			}
		}
	},16);
}
function move(aPoint,i){
	aPoint[i].x += aPoint[i].speedX;
	aPoint[i].y += aPoint[i].speedY;
	
	if(aPoint[i].x < 0+aPoint[i].r){
		aPoint[i].x = 0+aPoint[i].r;
		aPoint[i].speedX *= -1;
	}
	
	if(aPoint[i].x > winW-aPoint[i].r){
		aPoint[i].x = winW-aPoint[i].r;
		aPoint[i].speedX *= -1;
	}
	if(aPoint[i].y < 0+aPoint[i].r){
		aPoint[i].y = 0+aPoint[i].r;
		aPoint[i].speedY *= -1;
	}
	
	if(aPoint[i].y > winH-aPoint[i].r){
		aPoint[i].y = winH-aPoint[i].r;
		aPoint[i].speedY *= -1;
	}	
}
function toTarget(aPoint,i,n){
	n=n||20;
	aPoint[i].x += (aPoint[i].tx-aPoint[i].x)/n;
	aPoint[i].y += (aPoint[i].ty-aPoint[i].y)/n;
}
function drawPoint(p){
	if(Math.abs(p.speedX)<0.15){
		p.speedX+=p.speedX<0?-0.15:0.15;
	}
	if(Math.abs(p.speedY)<0.15) {
		p.speedY+=p.speedY<0?-0.15:0.15;
	}
	gd.beginPath();
	gd.moveTo(p.x, p.y);
	gd.arc(p.x,p.y,p.r,0,2*Math.PI,false);
	gd.fillStyle = "rgba(187,187,187,"+p.alpha+")";
	gd.fill();
}
function spring(a, b) {
	var dx = b.x - a.x,
	dy = b.y - a.y,
	dis = Math.sqrt(dx * dx + dy * dy);

	if (dis< minDis) {
	  var alpha = 1 - dis / minDis;
	  gd.strokeStyle = "rgba(187,187,187,"+alpha+")";
	  gd.beginPath();
	  gd.lineWidth="2";
	  gd.moveTo(a.x, a.y);
	  gd.lineTo(b.x, b.y);
	  gd.stroke();
	  return true;
	}
 }
function setCircle(point,ang){
	var a=Math.sin(a2r(ang))*winH/3;
	var b=Math.cos(a2r(ang))*winH/3;

	point.tx=winW/2+a;
	point.ty=winH/2-b;	
}
function setEight(point,ang,i){
	var a=Math.sin(a2r(ang))*winH/4;
	var b=Math.cos(a2r(ang))*winH/4;

	if(i<=N/2){
		point.tx=winW/2+a;
		point.ty=winH/4-b;	
	}else{
		point.tx=winW/2+a;
		point.ty=winH/4*3-b;
	}
}
function setLine(point,lx){
	point.tx=lx;
	point.ty=winH/2;
}
function shake(aPoint,i){
	if(Math.abs(aPoint[i].x-aPoint[i].tx)<1) aPoint[i].x+=2;
	if(Math.abs(aPoint[i].y-aPoint[i].ty)<1) aPoint[i].y+=2;	
}
function fontPos(imageSrc,array,count,num){
	num=num||31;
	var oImg = new Image();
	var arr=[];
	oImg.onload = function(){
		gd.drawImage(oImg,0,count);
		var result = gd.getImageData(0,count,num,5);
		var imageData = result.data;
		for (var x = 0; x < num; x++){
			for (var y = 0; y < 5; y++){
				var i = 4*(y * num + x);
                if (imageData[i] > 100){
					arr.push(1);
				}else{
					arr.push(0);
				}
			}
		}
		for(var j=0;j<arr.length;j++){
			if(arr[j]!=0){
				array.push(j);	
			}
		}
		//console.log(array.join(','))
	};
	oImg.src = imageSrc;
}
function setFont(aPoint,i,array,num){
	num=num||31;
	i%=array.length;
	aPoint.tx=Math.floor(array[i]/5)%num*winW/2/num+winW/4;
	aPoint.ty=array[i]%5*20+winH/5*2;
}