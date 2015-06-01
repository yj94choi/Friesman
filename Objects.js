
// ==================== maze object ====================

function Maze()
{
	this.pointsStart = points.length;
	cube(1);	// push maze cube points
	this.pointsLength = points.length - this.pointsStart;	
}

Maze.prototype.render = function(loc)
{
    var objToWorldM = translate(loc);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 0);
    gl.uniform1i(normalmapLoc, 1);
    gl.drawArrays( gl.TRIANGLES, this.pointsStart, this.pointsLength );
    gl.uniform1i(normalmapLoc, 0);
}

// ==================== fire object ====================

function Fire()
{
	this.pointsStart = points.length;
	cube(3);	// push fire cube points
	this.pointsLength = points.length - this.pointsStart;		
}

Fire.prototype.render = function()
{
	var objToWorldM = translate(10, 10, 1.5);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 5);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== floor object ====================

function Floor()
{
	this.pointsStart = points.length;
    square(0, 1, 2, 3, vec4(0,0,1,1));	// push floor points
    this.pointsLength = points.length - this.pointsStart;
}

Floor.prototype.render = function(loc)
{
    var objToWorldM = translate(loc);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 6);
    gl.drawArrays( gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== friesman object ====================

function Friesman2()
{
	this.pointsStart = points.length;
	cube(0);	// push friesman points
    this.pointsLength = points.length - this.pointsStart;
}

Friesman2.prototype.render = function()
{
    if(gameBoard.prevFriesMan.x === 0 || gameBoard.prevFriesMan.x === 20)
    {
        if(gameBoard.friesMan.currDir === WEST)
            fries_x_amount = gameBoard.prevFriesMan.x - timer / anim_speed;
        else if(gameBoard.friesMan.currDir === EAST)
            fries_x_amount = gameBoard.prevFriesMan.x + timer / anim_speed;
        fries_y_amount = gameBoard.prevFriesMan.y;
    }
    else
    {
        fries_x_amount = gameBoard.prevFriesMan.x + (gameBoard.friesMan.x - gameBoard.prevFriesMan.x) * timer / anim_speed;
        fries_y_amount = gameBoard.prevFriesMan.y + (gameBoard.friesMan.y - gameBoard.prevFriesMan.y) * timer / anim_speed;
    }
    var fRotation = getFriesmanRotation(gameBoard.friesMan.currDir);
    var objToWorldM = scale(0.3, 0.3, 1.5);
    objToWorldM = mult(fRotation, objToWorldM);
    objToWorldM = mult(translate(fries_x_amount, fries_y_amount, 0.25), objToWorldM);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniformMatrix3fv(mNormalLoc, false, new flatten(mat4To3(mult(modelViewM, fRotation))));
    gl.uniform1i(objectIDLoc, 2);
    gl.drawArrays( gl.TRIANGLES, this.pointsStart, this.pointsLength);
    gl.uniformMatrix3fv(mNormalLoc, false, new flatten(mat4To3(modelViewM)));
}

// ==================== ketchupdot object ====================

function Ketchupdot()
{
	this.pointsStart = points.length;
    sphere(3, false);	// push ketchupdot points
    this.pointsLength = points.length - this.pointsStart;
}

Ketchupdot.prototype.render = function(loc, size)
{
	var objToWorldM = mult(translate(loc), scale(size, size, size));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 1);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== enemy object ====================

function Enemy2()
{
	this.pointsStart = points.length;
    makeTorus(0.7, 0.3, 100, 20, 1.0);	// push ring points
    this.pointsLength = points.length - this.pointsStart;
}

Enemy2.prototype.render = function(id)
{
	enemy_x_amount = gameBoard.prevEnemyArray[id].x + (gameBoard.enemyArray[id].x - gameBoard.prevEnemyArray[id].x) * timer / anim_speed;
    enemy_y_amount = gameBoard.prevEnemyArray[id].y + (gameBoard.enemyArray[id].y - gameBoard.prevEnemyArray[id].y) * timer / anim_speed;
    var objToWorldM = mult(translate(enemy_x_amount,enemy_y_amount, 0.0), scale(0.3, 0.3, 0.3));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    if(gameBoard.power)
        gl.uniform1i(objectIDLoc, 11);
    else
        gl.uniform1i(objectIDLoc, 3);
    gl.drawArrays( gl.TRIANGLE_STRIP, this.pointsStart, this.pointsLength);
}

// ==================== stick object ====================

function Stick()
{
	this.pointsStart = points.length;
    cube(2);
    this.pointsLength = points.length - this.pointsStart;
}

Stick.prototype.render = function()
{
    var objToWorldM = translate(10, 10, 1);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 4);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== rock object ====================

function Obstacle()
{
	this.pointsStart = points.length;
    sphere(2, false);   // low complexity sphere for rocks
    this.pointsLength = points.length - this.pointsStart;
}

Obstacle.prototype.render = function(loc)
{
    var objToWorldM = mult(translate(loc), scale(0.3, 0.3, 0.3));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 7);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== shade object ====================

function Shade()
{
	this.pointsStart = points.length;
    sphere(4, false);   // higher complexity sphere for shade
    this.pointsLength = points.length - this.pointsStart;
}

Shade.prototype.render = function(loc, size)
{
    var objToWorldM = mult(translate(loc), scale(size,size, 0));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 8);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== door object ====================

function Door(start, length)
{
	this.pointsStart = start;
	this.pointsLength = length;
}

Door.prototype.render = function()
{
	var objToWorldM = translate(10, 12, 0);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 9);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}

// ==================== title object ====================

function Title(start, length)
{
	this.pointsStart = start;
	this.pointsLength = length;
}

Title.prototype.render = function()
{
    var objToWorldM = mult(translate(10,10,15),scale(8,8,0));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1f(opacityLoc, titlepage);
    gl.uniform1i(objectIDLoc, 10);
    gl.drawArrays(gl.TRIANGLES, this.pointsStart, this.pointsLength);
}