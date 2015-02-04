var snake_arrayX = [];
var snake_arrayY = [];
var foodX;
var foodY;
var borderX = 80;
var borderY = 60;
var score = 1000000;
var highScore = 900000;
var direction = "R";
var d = new Date();
var n = d.getTime();
var m = d.getTime();

function collision(x, y)
{
	if (x < 0 || x > borderX || y < 0 || y > borderY)
	{
		return true;
	}
	for (var i = 0; i < snake_arrayX.length; i++)
	{
		if (snake_arrayX[i] == x && snake_arrayY[i] == y)
		{
			return true;
		}
	}
	return false;
}
function createFood()
{
	var xTemp = Math.random()*x;
	var yTemp = Math.random()*y;
	while (collision(xTemp, yTemp))
	{
		xTemp = Math.random()*x;
		yTemp = Math.random()*y;
	}
	foodX = xTemp;
	foodY = yTemp;
}
function growSnake()
{
	//add new value to end
	snake_arrayX.push(0);
	snake_arrayY.push(0);
}
function move(x, y)
{
	if (collision(x,y))
	{
		return false; //game over
	}
	else if(x == foodX && y == foodY)
	{
		growSnake();
		score -= 10000;
	}
	score -= 1000;

	for(var i = snake_arrayX.length - 1; i > 0; i--)
	{
		snake_arrayX[i] = snake_arrayX[i-1];
		snake_arrayY[i] = snake_arrayY[i-1];
	}
	snake_arrayX[0] = x;
	snake_arrayY[0] = y;
	return true;
}
function draw()
{
	//iterate graph
	for (var i = 0; i < borderY; i++)
	{
		for (var j = 0; j < borderX; j++)
		{
			for(var k = 0; k < snake_arrayX.length; k++)
			{
				if(j == snake_arrayX[k] && i == snake_arrayY[k])
				{
					console.log("S");
				}
			}
			if(j == foodX && i == foodY)
			{
				console.log("A");
			}
			else
			{
				console.log(" ");
			}
		}
		console.log("/n");
	}
	console.log("/n");
	console.log("high score: " + highScore + "/n");
	console.log("score: " + score + "/n");
}

function initialize()
{
	snake_arrayX.push(0, 1, 2, 3, 4);
	snake_arrayY.push(0, 0, 0, 0, 0);
	createFood();
	draw();
	direction = "R";
}

function game_loop()
{
	while(true)
	{		
		while(true)
		{
			n = d.getTime();
			do
			{
				//check for input
				m = d.getTime();
			}while((m - n) < 60);
			var a = snake_arrayX.peek();
			var b = snake_arrayY.peek();
			if(direction == "R")
			{
				a++;	
			}
			else if(direction == "L")
			{
				a--;
			}
			else if(direction == "U")
			{
				b--;
			}
			else
			{
				b++;
			}
			draw();
			n = m = d.getTime();
			if(!move(a, b))
			{
				break;
			}
		}
		console.log("game over");
		if(score < highScore)
		{
			highScore = score;
		}
	}
}

var RIGHT_KEY_CODE = 68;
var LEFT_KEY_CODE = 65;
var UP_KEY_CODE = 87;
var DOWN_KEY_CODE = 83;

var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;

    if (keysPressed[RIGHT_KEY_CODE])
    {
    	direction = "R";
    }
    if (keysPressed[LEFT_KEY_CODE]) 
    {
    	direction = "L";
    }
    if (keysPressed[UP_KEY_CODE])
    {
    	direction = "U";
    }
    if (keysPressed[DOWN_KEY_CODE])
    {
    	direction = "D";
    }

function keyDown(e) {
    if ( e.keyCode in keysPressed ) keysPressed[e.keyCode] = true;
}

function keyUp(e) {
    if ( e.keyCode in keysPressed ) keysPressed[e.keyCode] = false;
}

document.addEventListener( 'keydown', keyDown, false );
document.addEventListener( 'keyup', keyUp, false );

/*
document.keydown(function(e){
	var key = e.which;
	//We will add another clause to prevent reverse gear
	if(key == "37" && d != "R") d = "L";
	else if(key == "38" && d != "D") d = "U";
	else if(key == "39" && d != "L") d = "R";
	else if(key == "40" && d != "U") d = "D";
	//The snake is now keyboard controllable
*/