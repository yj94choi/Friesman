// vertices of a unit cube with origin at (0,0,0)
var cubeVertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

var texCoord = [
    vec4(0, 0, 0.0, 1.0),
    vec4(0, 1, 0.0, 1.0),
    vec4(1, 1, 0.0, 1.0),
    vec4(1, 0, 0.0, 1.0)
];

// push points and texture coordinates for a quadrilateral
function quad(a, b, c, d, n) {
    points.push(cubeVertices[a]);
    normals.push(n);
    texCoords.push(texCoord[0]);

    points.push(cubeVertices[b]); 
    normals.push(n);
    texCoords.push(texCoord[1]); 

    points.push(cubeVertices[c]); 
    normals.push(n);
    texCoords.push(texCoord[2]); 
   
    points.push(cubeVertices[a]); 
    normals.push(n);
    texCoords.push(texCoord[0]); 

    points.push(cubeVertices[c]); 
    normals.push(n);
    texCoords.push(texCoord[2]); 

    points.push(cubeVertices[d]); 
    normals.push(n);
    texCoords.push(texCoord[3]);   
}

// push points and texture coordinates for a cube
function cube(){
    quad(1, 2, 3, 0, vec4(0,0,1,1));
    quad(3, 2, 6, 7, vec4(1,0,0,1));
    quad(4, 7, 3, 0, vec4(0,-1,0,1));
    quad(1, 2, 6, 5, vec4(0,1,0,1));
    quad(4, 5, 6, 7, vec4(0,0,-1,1));
    quad(5, 4, 0, 1, vec4(-1,0,0,1));
}
