var gl;
var points = [];
var normals = [];
var texCoords = [];
var tangents = [];

var canvas;
var program;
var objToWorldM;
var modelViewM;
var AngleRotation = 0;
var modelViewIndex = 0;
var mModelViewLoc;
var mTranslationLoc;
var mObjToWorldLoc;
var vTexCoord;

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
var num_stick_points = 0;
var num_fire_points = 0;
var num_floor_points = 0;
var num_obstacle_points = 0;
var num_shade_points = 0;

var timer = 0;
var pause = false;

var rock1;
var rock1_init_position = vec3(0,11,20);
var rock1_init_speed = vec3(0.0375, 0.00, 0.05);
var rock1_end_position = vec3(5,11,0);

var rock2;
var rock2_init_position = vec3(20,11,20);
var rock2_init_speed = vec3(-0.0375,0.00,0.05);
var rock2_end_position = vec3(15,11,0);

var gurimja1;
var shade1_init_position = vec3(rock1_init_position[0],rock1_init_position[1], -0.49);

var gurimja2;
var shade2_init_position = vec3(rock2_init_position[0],rock2_init_position[1], -0.49);

var total_distance;
var percent_moved;
var shade_scale_factor = 0;

var door = [];

var fries_x_amount;
var fries_y_amount;

var enemy_x_amount;
var enemy_y_amount;

// for debugging
var disable_enemy = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gameBoard = new Board();

    //obstacle
    rock1 = new ObstacleObject(rock1_init_position, rock1_init_speed, vec3(0.0, 0.0, -0.003));
    rock2 = new ObstacleObject(rock2_init_position, rock2_init_speed,vec3(0.0,0.0,-0.003));
    gurimja1 = new ShadeObject(shade1_init_position);
    gurimja2 = new ShadeObject(shade2_init_position);

    for ( var x = 0; x < 21; x++)
    {
        for ( var y = 0; y < 21; y++)
        {
            if (gameBoard.mapArray[y][x] === WALL)
            {
                walls.push( vec3(x*cellSize, y*cellSize, 0) );
            }
            else if (!(gameBoard.mapArray[y][x] === BLANK_SPACE || gameBoard.mapArray[y][x] === WALL ) )
            {
                floors.push( vec3(x*cellSize, y*cellSize, 0) );
            }

            if (gameBoard.mapArray[y][x] === DOOR)
            {
                door.push(vec3 (x*cellSize, y*cellSize, 0));
            }
        }
    }

    // maze
    cube(false);
    num_cube_points = points.length;
    // fire
    cube2(fireVertices);
    num_fire_points = points.length - num_cube_points;
    // floor
    floor(0, 1, 2, 3, vec4(0,0,1,1));
    num_floor_points = points.length - num_fire_points - num_cube_points;
    // friesman
    cube(true);
    num_friesman_points = points.length - num_fire_points - num_cube_points - num_floor_points;
    // ketchup dots
    ketchupdot(3, false);
    num_sphere_points = points.length - num_fire_points - num_cube_points - num_floor_points - num_friesman_points;
    // rings
    makeTorus(0.7, 0.3, 100, 20, 1.0);
    num_ring_points = points.length - num_fire_points - num_cube_points - num_floor_points - num_friesman_points - num_sphere_points;
    // stick
    cube2(stickVertices);
    num_stick_points = points.length - num_fire_points - num_cube_points - num_floor_points - num_friesman_points - num_sphere_points - num_ring_points;
    //obstacle
    obstacle(2, false);
    num_obstacle_points = points.length - num_fire_points - num_cube_points - num_floor_points - num_friesman_points - num_sphere_points - num_ring_points - num_stick_points;
    //shade
    shade(4, false);
    num_shade_points = points.length - num_fire_points - num_cube_points - num_floor_points - num_friesman_points - num_sphere_points - num_ring_points - num_stick_points - num_obstacle_points;

    window.onkeydown = function(input)
    {
        if (input.keyCode === 38)   // up arrow
        {
            if(modelViewIndex === 0 || modelViewIndex === 2)
                gameBoard.friesMan.nextDir = NORTH;
        }
        else if (input.keyCode === 39)  // right arrow
        {
            if(modelViewIndex === 0 || modelViewIndex === 2)
                gameBoard.friesMan.nextDir = EAST;
            else
                gameBoard.friesMan.nextDir = (gameBoard.friesMan.currDir+1)%4;
        }
        else if (input.keyCode === 40)  // down arrow
        {
            if(modelViewIndex === 0 || modelViewIndex === 2)
                gameBoard.friesMan.nextDir = SOUTH;
            else
                gameBoard.friesMan.nextDir = (gameBoard.friesMan.currDir+2)%4;
        }
        else if (input.keyCode === 37)  // left arrow
        {
            if(modelViewIndex === 0 || modelViewIndex === 2)
                gameBoard.friesMan.nextDir = WEST;
            else
                gameBoard.friesMan.nextDir = (gameBoard.friesMan.currDir+3)%4;
        }
        else if (input.keyCode === 90)  // z key
        {
            modelViewIndex = (modelViewIndex+1) % 3
        }
        else if (input.keyCode === 80)  // p key (pause)
        {
            pause = !pause;
            if(!pause)
                render();
        }

    }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
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

    // normal buffer
    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    // bind vTexCoord to texCoords array
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW );
    vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 4, gl.FLOAT, false, 0, 0 );
    gl.disableVertexAttribArray( vTexCoord );

    // tangents array
    var tanBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tanBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(tangents), gl.STATIC_DRAW );
    vTangent = gl.getAttribLocation( program, "vTangent" );
    gl.vertexAttribPointer( vTangent, 4, gl.FLOAT, false, 0, 0 );
    gl.disableVertexAttribArray( vTangent );

    loadTextures();   // defined in loadImage.js

    // set mPerspective
    var mPerspective = perspective( 60, canvas.width/canvas.height, 0.01, 1000);
    var mPerspectiveLoc = gl.getUniformLocation(program, "mPerspective");
    gl.uniformMatrix4fv(mPerspectiveLoc, false, new flatten(mPerspective));

    mModelViewLoc = gl.getUniformLocation(program, "mModelView");
    mObjToWorldLoc = gl.getUniformLocation(program, "mObjToWorld");
    objectIDLoc = gl.getUniformLocation(program, "objectID");
    mNormalLoc = gl.getUniformLocation(program, "mNormal");  // normal matrix to be used in vertex shader for shading
    normalmapLoc = gl.getUniformLocation(program, "normalmap");

    render();
};

function getModelView(index)
{
    if(gameBoard.prevFriesMan.x === 0 || gameBoard.prevFriesMan.x === 20)
    {
        if(gameBoard.friesMan.currDir === WEST)
            var xAmount = gameBoard.prevFriesMan.x - timer/15;
        else if(gameBoard.friesMan.currDir === EAST)
            var xAmount = gameBoard.prevFriesMan.x + timer/15;
        var yAmount = gameBoard.prevFriesMan.y;
    }
    else
    {
        var xAmount = gameBoard.prevFriesMan.x + (gameBoard.friesMan.x - gameBoard.prevFriesMan.x) * timer / 15;
        var yAmount = gameBoard.prevFriesMan.y + (gameBoard.friesMan.y - gameBoard.prevFriesMan.y) * timer / 15;
    }
    var reverseTranslation = translate(-xAmount, -yAmount, 0.0);

    if(index === 0)
    {
        return translate(-10, -10, -20);
    }
    else if(index === 1)
    {
        var adjustHeading = mult(translate(0,-2,-3), rotate(40, vec3(1,0,0)));
        return mult(mult(adjustHeading, getHeading(gameBoard.friesMan.currDir)), reverseTranslation);
    }
    else if(index === 2)
    {
        return mult(mult(rotate(-20, vec3(1,0,0)), translate(0, 2, -5)), reverseTranslation);
    }
}

function getHeading(dir)
{
    if(dir === NORTH)
        return rotate(-90, vec3(1,0,0));
    if(dir === SOUTH)
        return mult(rotate(180, vec3(0,1,0)), rotate(-90, vec3(1,0,0)));
    if(dir === EAST)
        return mult(rotate(90, vec3(0,1,0)), rotate(-90, vec3(1,0,0)));
    if(dir === WEST)
        return mult(rotate(-90, vec3(0,1,0)), rotate(-90, vec3(1,0,0)));
}

function getFriesmanRotation(dir)
{
    if(dir === NORTH)
        return mat4();
    if(dir === SOUTH)
        return rotate(180, vec3(0,0,1));
    if(dir === EAST)
        return rotate(-90, vec3(0,0,1));
    if(dir === WEST)
        return rotate(90, vec3(0,0,1));
}

function render() 
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: USE A REAL TIMER
    if(timer%15 === 0)
    {
        gameBoard.move(MOVE_FRIESMAN, 0);
        if(!disable_enemy)
            for (var i = 0; i < 4; i++)
            {
                gameBoard.move(MOVE_ENEMY, i);
            }
        if(MOVED < 20)
            MOVED++;
        timer = 0;
    }

    modelViewM = getModelView(modelViewIndex);
    gl.uniformMatrix4fv(mModelViewLoc, false, new flatten(modelViewM));
    gl.uniformMatrix3fv(mNormalLoc, false, new flatten(mat4To3(modelViewM)));
    
    gl.enableVertexAttribArray( vTexCoord );

    gl.enableVertexAttribArray( vTangent );
    // render cubes (maze)
    for(var k = 0; k < walls.length; k++)
    {
        objToWorldM = translate(walls[k]);
        gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
        
        gl.uniform1i(objectIDLoc, 0);
        gl.uniform1i(normalmapLoc, 1);
        gl.drawArrays( gl.TRIANGLES, 0, num_cube_points);
    }
    gl.disableVertexAttribArray( vTangent );
    gl.uniform1i(normalmapLoc, 0);

    // render fire
    objToWorldM = translate(10, 10, 1.5);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 5);
    gl.drawArrays(gl.TRIANGLES, num_cube_points, num_fire_points);

    // render floor
    for(var k = 0; k < floors.length; k++)
    {
        objToWorldM = translate(floors[k]);
        gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));

        gl.uniform1i(objectIDLoc, 6);
        gl.drawArrays( gl.TRIANGLES, num_fire_points+num_cube_points, num_floor_points );
    }

    // render friesman
    if(gameBoard.prevFriesMan.x === 0 || gameBoard.prevFriesMan.x === 20)
    {
        if(gameBoard.friesMan.currDir === WEST)
            fries_x_amount = gameBoard.prevFriesMan.x - timer/15;
        else if(gameBoard.friesMan.currDir === EAST)
            fries_x_amount = gameBoard.prevFriesMan.x + timer/15;
        fries_y_amount = gameBoard.prevFriesMan.y;
    }
    else
    {
        fries_x_amount = gameBoard.prevFriesMan.x + (gameBoard.friesMan.x - gameBoard.prevFriesMan.x) * timer / 15;
        fries_y_amount = gameBoard.prevFriesMan.y + (gameBoard.friesMan.y - gameBoard.prevFriesMan.y) * timer / 15;
    }
    objToWorldM = scale(0.3, 0.3, 1.5);
    var fRotation = getFriesmanRotation(gameBoard.friesMan.currDir);
    objToWorldM = mult(fRotation, objToWorldM);
    objToWorldM = mult(translate(fries_x_amount, fries_y_amount, 0.25), objToWorldM);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniformMatrix3fv(mNormalLoc, false, new flatten(mat4To3(mult(modelViewM, fRotation))));
    gl.uniform1i(objectIDLoc, 2);
    gl.drawArrays( gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points, num_friesman_points);

    gl.disableVertexAttribArray( vTexCoord );
    gl.uniformMatrix3fv(mNormalLoc, false, new flatten(mat4To3(modelViewM)));

    // render enemies
    for(var i = 0; i < 4; i++)
    {
        enemy_x_amount = gameBoard.prevEnemyArray[i].x + (gameBoard.enemyArray[i].x - gameBoard.prevEnemyArray[i].x) * timer / 15;
        enemy_y_amount = gameBoard.prevEnemyArray[i].y + (gameBoard.enemyArray[i].y - gameBoard.prevEnemyArray[i].y) * timer / 15;
        objToWorldM = mult(translate(enemy_x_amount,enemy_y_amount, 0.0), scale(0.3, 0.3, 0.3));
        gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
        gl.uniform1i(objectIDLoc, 3);
        gl.drawArrays( gl.TRIANGLE_STRIP, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points, num_ring_points);

        if(Math.abs(enemy_x_amount-fries_x_amount) <= 0.2 && Math.abs(enemy_y_amount-fries_y_amount) <= 0.2)
            gameBoard.die();
    }

    //render enemies testing version
    // for(var x = 0; x < 21; x++)
    // {
    //     for(var y = 0; y < 21; y++)
    //     {
    //         if(gameBoard.mapArray[y][x] === '0' || gameBoard.mapArray[y][x] === '1' || gameBoard.mapArray[y][x] === '2' || gameBoard.mapArray[y][x] === '3')
    //         {
    //             objToWorldM = mult(translate(x, y, 0.0), scale(0.3, 0.3, 0.3));
    //             gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    //             gl.uniform1i(objectIDLoc, 3);
    //             gl.drawArrays( gl.TRIANGLE_STRIP, num_fire_points+num_cube_points+num_sphere_points+num_friesman_points, num_ring_points);                        
    //         }
    //     }
    // }

    // render spheres (ketchup dots)
    for ( var x = 2; x < 19; x++)
    {
        for ( var y = 1; y < 20; y++)
        {
            if (gameBoard.mapArray[y][x] === ROAD_KETCHUP || gameBoard.mapArray[y][x] === ROAD_POWER)
            {
                var dotsize = gameBoard.mapArray[y][x] === ROAD_KETCHUP ? 0.12 : 0.2;
                objToWorldM = mult(translate(x*cellSize, y*cellSize, 0.0), scale(dotsize, dotsize, dotsize));
                gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));

                gl.uniform1i(objectIDLoc, 1);
                gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_friesman_points, num_sphere_points);
            }
        }
    }

    // render stick
    objToWorldM = mult(translate(10, 10, 1), rotate(90, vec3(1,0,0)));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 4);
    gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points+num_ring_points, num_stick_points);

    // render obstacle
    if (MOVED !== 0)
    {
        rock1.speed = add(rock1.speed, rock1.acceleration);
        rock1.position = add(rock1.position, rock1.speed);

        rock2.speed = add(rock2.speed, rock2.acceleration);
        rock2.position = add(rock2.position, rock2.speed);

        gurimja1.position = vec3(rock1.position[0],rock1.position[1], -0.49);
        gurimja2.position = vec3(rock2.position[0],rock2.position[1], -0.49);
    }
    if (rock1.position[0] <= fries_x_amount + 0.3 && rock1.position[0] >= fries_x_amount - 0.3 && rock1.position[1] <= fries_y_amount + 0.3 && rock1.position[1] >= fries_y_amount - 0.3)
    {
        if(rock1.position[2] <= 1.75)
        {
            rock1.speed = rock1_init_speed;
            rock1.position = rock1_init_position;

            rock2.speed = rock2_init_speed;
            rock2.position = rock2_init_position;

            gurimja1.position = shade1_init_position;
            gurimja2.position = shade2_init_position;

        }
    }
    else if(rock2.position[0] <= fries_x_amount + 0.3 && rock2.position[0] >= fries_x_amount - 0.3 && rock2.position[1] <= fries_y_amount + 0.3 && rock2.position[1] >= fries_y_amount - 0.3)
    {
        if(rock2.position[2] <= 1.75)
        {
            rock1.speed = rock1_init_speed;
            rock1.position = rock1_init_position;

            rock2.speed = rock2_init_speed;
            rock2.position = rock2_init_position;

            gurimja2.position = shade2_init_position;
        }
    }
    else if(rock1.position[2] <= -0.2)
    {
        rock1.speed = rock1_init_speed;
        rock1.position = rock1_init_position;

        rock2.speed = rock2_init_speed;
        rock2.position = rock2_init_position;

        gurimja1.position = shade1_init_position;
        gurimja2.position = shade1_init_position;     
    }
    total_distance = rock1_end_position[0]-rock1_init_position[0];
    percent_moved = (rock1.position[0])/(total_distance);
    shade_scale_factor = 4*(percent_moved/5);


    objToWorldM = mult(translate(rock1.position), scale(0.3, 0.3, 0.3));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 7);
    gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points+num_ring_points+num_stick_points, num_obstacle_points);

    objToWorldM = mult(translate(rock2.position), scale(0.3, 0.3, 0.3));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 7);
    gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points+num_ring_points+num_stick_points, num_obstacle_points);

    objToWorldM = mult(translate(gurimja1.position), scale(0.3*(0.4 + shade_scale_factor),0.3*(0.4 + shade_scale_factor), 0));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 8);
    gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points+num_ring_points+num_stick_points+num_obstacle_points, num_shade_points);

    objToWorldM = mult(translate(gurimja2.position), scale(0.3*(0.4 + shade_scale_factor),0.3*(0.4 + shade_scale_factor), 0));
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 8);
    gl.drawArrays(gl.TRIANGLES, num_floor_points+num_fire_points+num_cube_points+num_sphere_points+num_friesman_points+num_ring_points+num_stick_points+num_obstacle_points, num_shade_points);
    

    gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
    gl.depthMask( false );
    objToWorldM = translate(door[0]);
    gl.uniformMatrix4fv(mObjToWorldLoc, false, new flatten(objToWorldM));
    gl.uniform1i(objectIDLoc, 9);
    gl.drawArrays( gl.TRIANGLES, 0, num_cube_points);
    gl.depthMask( true );
    gl.disable( gl.BLEND );

    timer++;

    if (MOVED === 0)
        setTimeout(function (){window.requestAnimFrame(render)}, 400);
    else if (!pause)
        window.requestAnimFrame(render);
}
