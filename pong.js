const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");
const player1 =
{
   x : 2,
   y : cvs.height/2 - 100/2,
   width : 10,
   height : 100,
   color : "#0f0766",
   score : 0,
   speed:10
   
}


const player2 =
{
   x : cvs.width - 12,
   y : cvs.height/2 - 100/2,
   width : 10,
   height : 100,
   color : "#ab0e86",
   score : 0
   
}

const ball =
{
   x : cvs.width/2+3.6,
   y : cvs.height/2,
   radius : 10,
   speed : 5,
   velocityX : 5,
   velocityY : 5,
   color : "#7f7f7f",
}

function drawRect(x,y,w,h,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}
const net=
{
   x : cvs.width/2 ,
   y : 0,
   width : 7.5,
   height : 7.5,
   color : "#424242",   
}

function drawSquares()
{
	for(let i=0; i <=cvs.height; i+=15)
	{
		drawRect(net.x, net.y+i, net.width, net.height, net.color);
	}
}



function drawCircle(x,y,r,color)
{
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,false);
	ctx.closePath();
	ctx.fill();
}



document.onkeydown=movePlayer;


 function resetBall()
 {
	
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

//collision detection
 function collision(b,p){
     p.top = p.y;
     p.bottom = p.y + p.height;
     p.left = p.x;
     p.right = p.x + p.width;
     
     b.top = b.y - b.radius;
     b.bottom = b.y + b.radius;
     b.left = b.x - b.radius;
     b.right = b.x + b.radius;
     
     return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
 }

 // update function, the function that does all calculations
 function update(){
     var ballColor=ball.color;
     if(ball.x>cvs.width/2){
    	 ball.color=player1.color;ballColor=player1.color;}
     else{
    	 ball.color=player2.color;ballColor=player1.color;}
	
     if( ball.x - ball.radius < 0 )
     {
         player2.score++;
       
         resetBall();
     }else if( ball.x + ball.radius > cvs.width){
         player1.score++;
         resetBall();
     }
     if(player2.score==11 || player1.score==11){
    	stopGame(player1.score,player2.score);
     }
    
     ball.x += ball.velocityX;
     ball.y += ball.velocityY;
     
    
     
    
     if(ball.y - ball.radius < 0 || ball.y + ball.radius > cvs.height)
     {
         ball.velocityY = -ball.velocityY;
         
     }
     
     
     let player = (ball.x + ball.radius < cvs.width/2) ? player1 : player2;
     
     
     if(collision(ball,player))
     {
         let collidePoint = (ball.y - (player.y + player.height/2));
        
         collidePoint = collidePoint / (player.height/2);
         
         let angleRad = (Math.PI/4) * collidePoint;
        
         let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : -1;
         ball.velocityX = direction * ball.speed * Math.cos(angleRad);
         ball.velocityY = ball.speed * Math.sin(angleRad);
         
         ball.speed += 0.1;
     }
 }

function movePlayer(){
	let rect=cvs.getBoundingClientRect();
	var max,min;
	if (window.event)
	{keyCode = window.event.keyCode;}
	var speed=10;
	if(keyCode==83){
		player1.y+=rect.top-player1.height/2;
		if(player1.y>405){
			player1.y=400+player1.height/3
		}	
	}
	if(keyCode==40){
		
	player2.y+=rect.top-player2.height/2;
	if(player2.y>405){
		player2.y=400+player2.height/3
	}
	}
	if(keyCode==87){
		player1.y-=rect.top-player1.height/2-speed;
		if(player1.y<0){
			player1.y=-player1.height/3
		}
	}
	if(keyCode==38){
		
		player2.y-=rect.top-player2.height/2-speed;
		if(player2.y<0){
			player2.y=-player2.height/3
		}
		
		}
}

function drawText(text, x, y, color)
{
	ctx.fillStyle = color;
	ctx.font = "25px fantasy";
	ctx.fillText(text ,x,y);
	 
}
function drawTextRslt(text, x, y, color)
{
	
	ctxrslt.fillStyle = color;
	ctxrslt.font = "15px fantasy";
	ctxrslt.fillText(text ,x,y);
}




function render()
{
	drawRect(0,0,cvs.width,cvs.height,"white");
	drawRect(4,4,cvs.width-8,cvs.height-8,"#e8f1f5");
	drawSquares();
	drawText("Player 1",cvs.width/4,cvs.height/10,player1.color);
	drawText(player1.score,cvs.width/4,1.9*cvs.height/10,"black");
	drawText("Player  2",2.75*cvs.width/4,cvs.height/10,player2.color);
	drawText(player2.score,3.1*cvs.width/4,1.9*cvs.height/10,"black");
	drawRect(player1.x,player1.y,player1.width,player1.height,player1.color);
	drawRect(player2.x,player2.y,player2.width,player2.height,player2.color);
	drawCircle(ball.x, ball.y,ball.radius,ball.color);
}


function game()
{
	update();
	render();
}



const framePerSecond = 50;
let loop= setInterval(game,1000/framePerSecond);

function stopGame(score1,score2)
{
	clearInterval(loop);
		 if(score1>=11)
		 alert("Congratulations, Player 1 has won the game");
	     if(score2>=11)
		 alert("Congratulations, Player 2 has won the game");
	 
}
