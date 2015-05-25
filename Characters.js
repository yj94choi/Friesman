// startX is the initial X position of the Enemy
// startY is the initial Y position of the Enemy
// currDir is the current direction of the coordinate (north, east, south, west) of the Enemy
// currDir (0, north), (1, east), (2, south), (3, west)

var DUMB_ENEMY = 0;
var SMART_ENEMY = 1;

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;

function Friesman(startX, startY, dir)
{
	this.x = startX;
	this.y = startY;
	this.currDir = dir;
	this.nextDir = dir;
}

// if enemyType === 0, dumbEnemy
// if enemyType === 1, smartEnemy

function Enemy(enemyType, startX, startY, passed)
{
	this.type = enemyType;
	this.x = startX;
	this.y = startY;
	this.currDir = NORTH;
	this.passedDoor = passed;
}

Enemy.prototype.randDir = function()
{
	do
	{
		var x = Math.floor((Math.random() * 4));
	} while (x === this.currDir);
	this.currDir = x;
}

