
var ROAD_EMPTY = ' ';
var ROAD_KETCHUP = '.';
var BLANK_SPACE = 'x';
var WALL = 'o';
var MOVED = 0;

function Board()
{
	// creating enemies inside of the map
	this.enemyArray = [new Enemy(DUMB_ENEMY, 10, 13, WEST, true),
					   new Enemy(DUMB_ENEMY, 9, 11, EAST, false),
					   new Enemy(SMART_ENEMY, 10, 11, NORTH, false),
					   new Enemy(SMART_ENEMY, 11, 11, WEST, false)];

	// creating Friesman
	this.friesMan = new Friesman(10, 5);

	// creating the map
	this.mapArray = [
// 	 -> East
//   ^  South
//    0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20
	['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'], // 0
	['x', 'o', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'o', 'x'], // 1
	['x', 'o', '.', 'o', 'o', 'o', 'o', 'o', 'o', '.', 'o', '.', 'o', 'o', 'o', 'o', 'o', 'o', '.', 'o', 'x'], // 2
	['x', 'o', '.', '.', '.', '.', 'o', '.', '.', '.', 'o', '.', '.', '.', 'o', '.', '.', '.', '.', 'o', 'x'], // 3
	['x', 'o', 'o', '.', 'o', '.', 'o', '.', 'o', 'o', 'o', 'o', 'o', '.', 'o', '.', 'o', '.', 'o', 'o', 'x'], // 4
	['x', 'o', '.', '.', 'o', '.', '.', '.', '.', '.', 'F', '.', '.', '.', '.', '.', 'o', '.', '.', 'o', 'x'], // 5
	['x', 'o', '.', 'o', 'o', '.', 'o', 'o', 'o', '.', 'o', '.', 'o', 'o', 'o', '.', 'o', 'o', '.', 'o', 'x'], // 6
	['x', 'o', '.', '.', '.', '.', '.', '.', '.', '.', 'o', '.', '.', '.', '.', '.', '.', '.', '.', 'o', 'x'], // 7
	['x', 'o', 'o', 'o', 'o', '.', 'o', ' ', 'o', 'o', 'o', 'o', 'o', ' ', 'o', '.', 'o', 'o', 'o', 'o', 'x'], // 8
	['x', 'x', 'x', 'x', 'o', '.', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', '.', 'o', 'x', 'x', 'x', 'x'], // 9
	['o', 'o', 'o', 'o', 'o', '.', 'o', ' ', 'o', 'o', 'o', 'o', 'o', ' ', 'o', '.', 'o', 'o', 'o', 'o', 'o'], // 10
	[' ', ' ', ' ', ' ', ' ', '.', ' ', ' ', 'o', '1', '2', '3', 'o', ' ', ' ', '.', ' ', ' ', ' ', ' ', ' '], // 11
	['o', 'o', 'o', 'o', 'o', '.', 'o', ' ', 'o', 'o', 'd', 'o', 'o', ' ', 'o', '.', 'o', 'o', 'o', 'o', 'o'], // 12
	['x', 'x', 'x', 'x', 'o', '.', 'o', ' ', ' ', ' ', '0', ' ', ' ', ' ', 'o', '.', 'o', 'x', 'x', 'x', 'x'], // 13
	['x', 'o', 'o', 'o', 'o', '.', 'o', 'o', 'o', ' ', 'o', ' ', 'o', 'o', 'o', '.', 'o', 'o', 'o', 'o', 'x'], // 14
	['x', 'o', '.', '.', '.', '.', 'o', '.', '.', '.', 'o', '.', '.', '.', 'o', '.', '.', '.', '.', 'o', 'x'], // 15
	['x', 'o', '.', 'o', 'o', '.', 'o', '.', 'o', 'o', 'o', 'o', 'o', '.', 'o', '.', 'o', 'o', '.', 'o', 'x'], // 16
	['x', 'o', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'o', 'x'], // 17
	['x', 'o', '.', 'o', 'o', '.', 'o', 'o', 'o', '.', 'o', '.', 'o', 'o', 'o', '.', 'o', 'o', '.', 'o', 'x'], // 18
	['x', 'o', '.', '.', '.', '.', '.', '.', '.', '.', 'o', '.', '.', '.', '.', '.', '.', '.', '.', 'o', 'x'], // 19
	['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x']  // 20
	];

	// check if friesMan has died
	this.died = false;

	// stores the previous value of the map
	this.prevState = [ROAD_EMPTY, ROAD_EMPTY, ROAD_EMPTY, ROAD_EMPTY];
}

// displaying the map
Board.prototype.display = function()
{
	for (var i = 20; i >= 0; i--)
	{
		var temp = '';
		for (var j = 0; j < 21; j++)
		{
			temp += this.mapArray[i][j];
		}
		console.log(temp);
	}
}

// type is either Friesman (0) or Enemy (1), number specifies the ID of the enemy
// still needs to implement the part where Friesman moves into one of the enemies or vice versa
Board.prototype.move = function(type, number)
{
	// Friesman's move
	if (type === MOVE_FRIESMAN)
	{
		var currX = this.friesMan.x;
		var currY = this.friesMan.y;
		var dir = this.friesMan.currDir;

		if(dir === NORTH || dir === SOUTH)
			var nextX = currX;
		else if(dir === EAST)
			var nextX = currX + 1;
		else if(dir === WEST)
			var nextX = currX - 1;

		if(dir === EAST || dir === WEST)
			var nextY = currY;
		else if(dir === NORTH)
			var nextY = currY + 1;
		else if(dir === SOUTH)
			var nextY = currY - 1;

		// check the bound
		if(nextY >= 0 && nextY <= 20 && nextX >= 0 && nextX <= 20)
		{
			if(this.mapArray[nextY][nextX] === ROAD_KETCHUP || this.mapArray[nextY][nextX] === ROAD_EMPTY)
			{
				//////////////// TODO: UPDATE THE SCORE AND DECREMENT THE # OF KETCHUP DOTS //////////////////////////////
				this.mapArray[currY][currX] = ROAD_EMPTY;	// mark the point as visited
				this.mapArray[nextY][nextX] = 'F';			// makr the next point as Friesman
				this.friesMan.x += (nextX - currX);			// update Friesman's position
				this.friesMan.y += (nextY - currY);
			}
			else if(this.mapArray[nextY][nextX] === '0' || this.mapArray[nextY][nextX] === '1' || this.mapArray[nextY][nextX] === '2' || this.mapArray[nextY][nextX] === '3')
			{
				this.died = true;
			}
		}
	}
	// Enemy's move
	else
	{
		his.mapArray[currY][currX] = this.prevState[number];
					this.prevState[number] = this.mapArray[nextY][nextX];
					this.mapArray[nextY][nextX] = currChar;
					this.enemyArray[number].x += (nextX - currX);
					this.enemyArray[number].y += (nextY - currY);
		if(MOVED < 10)
		{
			switch(MOVED)
			{
				case 0:
					if(number === 0)
					{
						this.mapArray[13][10] = ROAD_EMPTY;
						this.prevState[0] = this.mapArray[13][9];
						this.mapArray[13][9] = '0';
						this.enemyArray[0].x = 9;
					}
					if(number === 2)
					{
						this.mapArray[11][10] = ROAD_EMPTY;
						this.prevState[2] = this.mapArray[12][10];
						this.mapArray[12][10] = '2';
						this.enemyArray[2].y = 12;
					}
					return;
				case 1:
					if(number === 0)
					{
						this.mapArray[13][9] = ROAD_EMPTY;
						this.prevState[0] = this.mapArray[14][9];
						this.mapArray[14][9] = '0';
						this.enemyArray[0].y = 14;
					}
					if(number === 2)
					{
						this.mapArray[11][10] = ROAD_EMPTY;
						this.prevState[2] = this.mapArray[12][10];
						this.mapArray[12][10] = '2';
						this.enemyArray[2].y = 12;
					}
					if(number === 1)
					{

					}
					return;
				case 2:
					// ...
					return;
				case 3:
					// ...
					return;
				case 4:
					// ...
					return;
				case 5:
					// ...
					return;
				case 6:
					// ...
					return;
				case 7:
					// ...
					return;
				case 8:
					//...
					return;
				case 9:
					return;
			}
		}

		var repeat = false;
		do
		{
			var currX = this.enemyArray[number].x;
			var currY = this.enemyArray[number].y;
			var dir = this.enemyArray[number].currDir;
			var currChar = number.toString();

			if(dir === NORTH || dir === SOUTH)
				var nextX = currX;
			else if(dir === EAST)
				var nextX = currX + 1;
			else if(dir === WEST)
				var nextX = currX - 1;

			if(dir === EAST || dir === WEST)
				var nextY = currY;
			else if(dir === NORTH)
				var nextY = currY + 1;
			else if(dir === SOUTH)
				var nextY = currY - 1;

			if(nextY >= 0 && nextY <= 20 && nextX >= 0 && nextX <= 20)
			{
				if(this.mapArray[nextY][nextX] === ROAD_KETCHUP || this.mapArray[nextY][nextX] === ROAD_EMPTY || (this.mapArray[nextY][nextX] === 'd' && !this.enemyArray[number].passedDoor))
				{
					if(number === 1)
						console.log("passedDoor: " + this.enemyArray[number].passedDoor.toString());
					if(this.mapArray[nextY][nextX] === 'd')
						this.enemyArray[number].passedDoor = true;		
					this.mapArray[currY][currX] = this.prevState[number];
					this.prevState[number] = this.mapArray[nextY][nextX];
					this.mapArray[nextY][nextX] = currChar;
					this.enemyArray[number].x += (nextX - currX);
					this.enemyArray[number].y += (nextY - currY);
					repeat = false;
				}
				else if(this.mapArray[nextY][nextX] === 'F')		// enemy has killed Friesman
				{
					this.mapArray[currY][currX] = this.prevState[number];
					this.prevState[number] = this.mapArray[nextY][nextX];
					this.mapArray[nextY][nextX] = currChar;
					this.died = true;
					repeat = false;
				}
				else
				{
					console.log("IN HERE 1");
					this.enemyArray[number].randDir();
					repeat = true;
				}
			}
			else
			{
				console.log("IN HERE 2");
				this.enemyArray[number].randDir();
				repeat = true;
			}
		} while(repeat)
		MOVED++;
	}
}