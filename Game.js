// function Game()
// {

// }

var MOVE_FRIESMAN = 0;
var MOVE_ENEMY = 1;

window.onload = function init()
{
	var board = new Board();
	window.onkeydown = function(input)
    {
    	if (input.keyCode === 38)		// up arrow
    	{
    		board.friesMan.currDir = NORTH;
    	}
    	else if (input.keyCode === 39)	// right arrow
    	{
    		board.friesMan.currDir = EAST;
    	}
    	else if (input.keyCode === 40)	// down arrow
    	{
    		board.friesMan.currDir = SOUTH;
    	}
    	else if (input.keyCode === 37)	// left arrow
    	{
    		board.friesMan.currDir = WEST;
    	}
    	else if (input.keyCode === 90)  // z key
    	{
    		board.move(MOVE_FRIESMAN, 0);

            for (var i = 0; i < 4; i++)
            {
        		board.move(MOVE_ENEMY, i);
        		board.display();
            }
    	}

    }

    // while(!board.died)
    // {
    // 	board.display()
    // 	board.move(MOVE_FRIESMAN, 0);
    // 	for (var i = 0; i < 3; i++)
    // 	{
    // 		board.move(MOVE_ENEMY, i);
    // 	}
    // }
}