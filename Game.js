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
var directions = [];
var cellSize = 1;

var MOVE_FRIESMAN = 0;
var MOVE_ENEMY = 1;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gameBoard = new Board();
    field = gameBoard.mapArray;

    for ( var x = 0; x < 21; x++)
    {
        for ( var y = 0; y < 21; y++)
        {
            if (field[y][x] === WALL)
            {
                directions.push( vec3(x*cellSize,y*cellSize,0) );
            }
        }
    }

    window.onkeydown = function(input){
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
        else if (input.keyCode === 38)       // up arrow
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
            gameBoard.move(MOVE_FRIESMAN, 0);

            for (var i = 0; i < 4; i++)
            {
                gameBoard.move(MOVE_ENEMY, i);
                gameBoard.display();
            }
            MOVED++;
        }

    }

    //vertices for cube & outline
    var vertices = [
        vec4(-0.5, 0.5, 0.5, 1.0),
        vec4(-0.5,-0.5, 0.5, 1.0),
        vec4( 0.5,-0.5, 0.5, 1.0),
        vec4( 0.5, 0.5, 0.5, 1.0),
        vec4(-0.5, 0.5, -0.5,1.0),
        vec4(-0.5,-0.5, -0.5,1.0),
        vec4( 0.5,-0.5, -0.5,1.0),
        vec4( 0.5, 0.5, -0.5,1.0),  
        vec4(-1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0),
        vec4(0.0,-1.0,0.0,1.0),
        vec4(0.0,1.0,0.0,1.0)
    ];

    //draw cube (with triangle strip) and outline of cube
    points = [  
        vertices[0], vertices[1], vertices[2], vertices[6], vertices[3], 
        vertices[7], vertices[4], vertices[6], vertices[5], vertices[1], 
        vertices[4], vertices[0], vertices[3], vertices[2],

        vertices[0], vertices[1],
        vertices[1], vertices[2],
        vertices[2], vertices[3],
        vertices[3], vertices[0],
        vertices[4], vertices[5],
        vertices[5], vertices[6],
        vertices[6], vertices[7],
        vertices[7], vertices[4],
        vertices[0], vertices[4],
        vertices[1], vertices[5],
        vertices[2], vertices[6],
        vertices[3], vertices[7],
        vertices[8], vertices[9],
        vertices[10], vertices[11]
    ];

    //var rotationMatrix = rotate( 45.0, [1.0, 0.0, 0.0]);
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

    objectIDLoc = gl.getUniformLocation(program, "objectID");

    render();

};

function render() 
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var Turn = rotate(TurnAngle, vec3(0,1,0));
    gl.uniformMatrix4fv(mTurningLoc, false, new flatten(Turn));

    // render cubes (maze) with outline
    for(var k = 0; k < directions.length; k++)
    {
        translateM = mult( translate(-10+xaxis, -10+yaxis, -30+zaxis), translate(directions[k]) );

        gl.uniformMatrix4fv(mTranslationLoc, false, new flatten(translateM));
        gl.uniform1i(objectIDLoc, 0);
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 14);
        gl.uniform1i(objectIDLoc, 1);
        gl.drawArrays( gl.LINES, 14, 24);
    }

    window.requestAnimFrame(render);
}