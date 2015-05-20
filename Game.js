var gl;
var points = [];
var normals = [];
var texCoordsArray = [];

var canvas;
var program;
var translateM;
var xaxis = 0;
var yaxis = 0;
var zaxis = 0;
var AngleRotation = 0;
var TurnAngle = 0;
var mTurningLoc;
var mTranslationLoc;

var gameBoard;
var field;
var walls = [];
var ketchups = [];
var cellSize = 1;

var MOVE_FRIESMAN = 0;
var MOVE_ENEMY = 1;

var num_cube_points = 0;
var num_sphere_points = 0;
var num_friesman_points = 0;
var num_ring_points = 0;

var timer = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gameBoard = new Board();

    for ( var x = 0; x < 21; x++)
    {
        for ( var y = 0; y < 21; y++)
        {
            if (gameBoard.mapArray[y][x] === WALL)
            {
                walls.push( vec3(x*cellSize, y*cellSize, 0) );
            }
        }
    }

    cube();
    num_cube_points = points.length;
    ketchupdot(3, false);
    num_sphere_points = points.length - num_cube_points;
    friesman();
    num_friesman_points = points.length - num_sphere_points - num_cube_points;
    makeTorus(0.7, 0.3, 100, 20, 1.0);
    num_ring_points = points.length - num_friesman_points - num_sphere_points - num_cube_points;

    window.onkeydown = function(input)
    {
        if(input.keyCode ==74) //when pressed j
            xaxis += 0.25;
        else if(input.keyCode ==75) //when pressed k
            xaxis -= 0.25;
        else if(input.keyCode ==73) //when pressed i
            zaxis += 0.25;
        else if(input.keyCode ==77) //when pressed m
            zaxis -= 0.25;
        else if(input.keyCode ==82) //when pressed r
        {
            yaxis = 0;
            xaxis = 0;
            zaxis = 0;
            TurnAngle = 0;
        }
        else if (input.keyCode === 38)   // up arrow
        {
            gameBoard.friesMan.currDir = NORTH;
        }
        else if (input.keyCode === 39)  // right arrow
        {
            gameBoard.friesMan.currDir = EAST;
        }
        else if (input.keyCode === 40)  // down arrow
        {
            gameBoard.friesMan.currDir = SOUTH;
        }
        else if (input.keyCode === 37)  // left arrow
        {
            gameBoard.friesMan.currDir = WEST;
        }
        else if (input.keyCode === 90)  // z key
        {
            // gameBoard.move(MOVE_FRIESMAN, 0);

            // for (var i = 0; i < 4; i++)
            // {
            //     gameBoard.move(MOVE_ENEMY, i);
            //     gameBoard.display();
            // }
            // MOVED++;
        }

    }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    gl.enable(gl.DEPTH_TEST);

    // Load the data into the GPU, set vPosition
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // set mPerspective
    var mPerspective = perspective( 60, canvas.width/canvas.height, 1, 1000);
    var mPerspectiveLoc = gl.getUniformLocation(program, "mPerspective");
    gl.uniformMatrix4fv(mPerspectiveLoc, false, new flatten(mPerspective));

    mTurningLoc = gl.getUniformLocation(program, "mTurning");

    mTranslationLoc = gl.getUniformLocation(program, "mTranslation");

    mScaleLoc = gl.getUniformLocation(program, "mScale");

    objectIDLoc = gl.getUniformLocation(program, "objectID");

    render();

};

function render() 
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: USE A REAL TIMER
    if(timer%10 === 0)
    {

        gameBoard.move(MOVE_FRIESMAN, 0);
        for (var i = 0; i < 4; i++)
        {
            gameBoard.move(MOVE_ENEMY, i);
        }
        MOVED++;
        timer = 0;
    }

    var Turn = rotate(TurnAngle, vec3(0,1,0));
    gl.uniformMatrix4fv(mTurningLoc, false, new flatten(Turn));

    // render cubes (maze)
    for(var k = 0; k < walls.length; k++)
    {
        translateM = mult( translate(-10+xaxis, -10+yaxis, -30+zaxis), translate(walls[k]) );
        gl.uniformMatrix4fv(mTranslationLoc, false, new flatten(translateM));

        gl.uniformMatrix4fv(mScaleLoc, false, new flatten(mat4()));

        gl.uniform1i(objectIDLoc, 0);
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, num_cube_points);
    }

    // render spheres (ketchup dots)
    for ( var x = 0; x < 21; x++)
    {
        for ( var y = 0; y < 21; y++)
        {
            if (gameBoard.mapArray[y][x] === ROAD_KETCHUP)
            {
                translateM = mult( translate(-10+xaxis, -10+yaxis, -30+zaxis), translate(x*cellSize, y*cellSize, 0.0) );
                gl.uniformMatrix4fv(mTranslationLoc, false, new flatten(translateM));

                gl.uniformMatrix4fv(mScaleLoc, false, new flatten(scale(0.15, 0.15, 0.15)));

                gl.uniform1i(objectIDLoc, 1);
                gl.drawArrays(gl.TRIANGLES, num_cube_points, num_sphere_points);
            }
        }
    }

    // render friesman
    var xAmount = gameBoard.prevFriesMan.x + (gameBoard.friesMan.x - gameBoard.prevFriesMan.x) * timer / 10;
    var yAmount = gameBoard.prevFriesMan.y + (gameBoard.friesMan.y - gameBoard.prevFriesMan.y) * timer / 10;
    translateM = mult( translate(-10+xaxis, -10+yaxis, -30+zaxis), translate(xAmount, yAmount, 0.0) );
    gl.uniformMatrix4fv(mTranslationLoc, false, new flatten(translateM));
    gl.uniformMatrix4fv(mScaleLoc, false, new flatten(scale(0.5, 0.5, 0.5)));
    gl.uniform1i(objectIDLoc, 2);
    gl.drawArrays( gl.TRIANGLES, num_cube_points+num_sphere_points, num_friesman_points);

    // render enemies
    for(var i = 0; i < 4; i++)
    {
        var xAmount = gameBoard.prevEnemyArray[i].x + (gameBoard.enemyArray[i].x - gameBoard.prevEnemyArray[i].x) * timer / 10;
        var yAmount = gameBoard.prevEnemyArray[i].y + (gameBoard.enemyArray[i].y - gameBoard.prevEnemyArray[i].y) * timer / 10;
        translateM = mult( translate(-10+xaxis, -10+yaxis, -30+zaxis), translate(xAmount, yAmount, 0.0) );
        gl.uniformMatrix4fv(mTranslationLoc, false, new flatten(translateM));
        gl.uniformMatrix4fv(mScaleLoc, false, new flatten(scale(0.3, 0.3, 0.3)));
        gl.uniform1i(objectIDLoc, 3);
        gl.drawArrays( gl.TRIANGLE_STRIP, num_cube_points+num_sphere_points+num_friesman_points, num_ring_points);        
    }

    timer++;
    window.requestAnimFrame(render);
}