var gl;
var points;
var colors = [];
var crosshairbool = false;
var canvas;
var crosshair;
var program;
var Zoom = 0;
var translateM;
var xaxis = 0;
var yaxis = 0;
var zaxis = 0;
var ColorArray;
var AngleRotation = 0;
var TurnAngle = 0;
var ScaleF = 180;
var ScaleS = 0;

var gameBoard;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gameBoard = new Board();
    // gameBoard.mapArray;

    ColorArray = [
        vec4( 0.9, 0.9, 0.2, 1.0 ),  // oarnge
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];
    window.onkeydown = function(input){
        if(input.keyCode == 107 || input.shiftKey && input.keyCode == 187) //when pressed +
            crosshairbool = !crosshairbool;
        else if(input.keyCode == 67) //when pressed c
        {
            var temp = ColorArray[0];
            for(i = 0 ; i < 7; i++)
                ColorArray[i] = ColorArray[i+1];
            ColorArray[7] = temp;
        }     
        else if(input.keyCode ==87) //when pressed w
            Zoom++;
        else if(input.keyCode ==78) //when pressed n
            Zoom--;
        else if(input.keyCode ==74) //when pressed j
            xaxis += 0.25;
        else if(input.keyCode ==75) //when pressed k
            xaxis -= 0.25;
        else if(input.keyCode ==40) //when pressed down
            yaxis += 0.25;
        else if(input.keyCode ==38) //when pressed up
            yaxis -= 0.25;
        else if(input.keyCode ==39) //right
            TurnAngle++;
        else if(input.keyCode ==37) //left
            TurnAngle--;
        else if(input.keyCode ==73) //when pressed i
            zaxis += 0.25;
        else if(input.keyCode ==77) //when pressed m
            zaxis -= 0.25;
        else if(input.keyCode ==82) //when pressed r
        {
            Zoom = 0;
            yaxis = 0;
            xaxis = 0;
            zaxis = 0;
            TurnAngle = 0;
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

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Set vPosition
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();

};

function render() 
{
    //translation matrix--cube in cubic manner
    var translateArray = [translate(10,10,10), translate(-10,10,10),
                          translate(10,-10, 10), translate(10,10,-10),
                          translate(-10,-10,10), translate(-10,10,-10),
                          translate(10,-10,-10), translate(-10,-10,-10)
                           ];

    var perspectiveMatrix = perspective( 60 + Zoom, canvas.width/canvas.height, 1, 1000);
    
    var ZRotMatrix = rotate(AngleRotation, vec3(0.0,0.0,1.0));
    
    AngleRotation += 5;

    var Turn = rotate(TurnAngle, vec3(0,1,0));

    ScaleF += 0.1;
    ScaleS = Math.cos(ScaleF)*0.1 + 1.0;

    var Scale = scale(ScaleS, ScaleS, ScaleS);

    var mScale = gl.getUniformLocation(program, "mScale");
    gl.uniformMatrix4fv(mScale, false, new flatten(Scale));

    var mTurning = gl.getUniformLocation(program, "mTurning");
    gl.uniformMatrix4fv(mTurning, false, new flatten(Turn));

    var mRotation = gl.getUniformLocation(program, "mRotation");
    gl.uniformMatrix4fv(mRotation, false, new flatten(ZRotMatrix));

    var mPerspective = gl.getUniformLocation(program, "mPerspective");
    gl.uniformMatrix4fv(mPerspective, false, new flatten(perspectiveMatrix));

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //create 8 cubes with white outlines
    for(var k = 0; k < 8; k++)
    {
        colors = [];
        
        for(var i = 0; i < 14; i++)
            colors.push(ColorArray[k]);

        for(var i = 0; i < 24; i++)
            colors.push(vec4(1.0, 1.0, 1.0, 1.0));

        for(var i = 0; i < 4; i++)
            colors.push(vec4(1.0, 1.0, 1.0, 1.0));

        var Colorbuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, Colorbuffer);
        gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( vColor );

        translateM = mult(translate(xaxis,yaxis,-30 + zaxis), translateArray[k]);
        var mTranslation = gl.getUniformLocation(program, "mTranslation");
        gl.uniformMatrix4fv(mTranslation, false, new flatten(translateM));
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 14 );
        gl.drawArrays( gl.LINES, 14, 24);
    }
   
    //crosshair
    if(crosshairbool)
    {
        translateM = mat4();
        gl.uniformMatrix4fv(mTranslation, false, new flatten(translateM));
        perspectiveMatrix = mat4();
        gl.uniformMatrix4fv(mPerspective, false, new flatten(perspectiveMatrix));
        ZRotMatrix = mat4();
        gl.uniformMatrix4fv(mRotation, false, new flatten(ZRotMatrix));
        Turning = mat4();
        gl.uniformMatrix4fv(mTurning, false, new flatten(Turning));
        Scale = mat4();
        gl.uniformMatrix4fv(mScale, false, new flatten(Scale));
        gl.drawArrays( gl.LINES, 38, 4);
    }
    window.requestAnimFrame(render);
}
