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

var texCoord2 = [
    vec4(0.0, 0.0, 0.0, 1.0),
    vec4(0.0, 0.5, 0.0, 1.0),
    vec4(0.5, 0.5, 0.0, 1.0),
    vec4(0.5, 0.0, 0.0, 1.0)
];

// push points and texture coordinates for a quadrilateral
function quad(a, b, c, d, n, mapface, t)
{
    points.push(cubeVertices[a]);
    normals.push(n);
    if(mapface)
        texCoords.push(t[1]);
    else
        texCoords.push(t[0]);

    points.push(cubeVertices[b]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[2]); 
    else
        texCoords.push(t[0]);

    points.push(cubeVertices[c]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[3]); 
    else
        texCoords.push(t[0]);
       
    points.push(cubeVertices[a]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[1]); 
    else
        texCoords.push(t[0]);

    points.push(cubeVertices[c]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[3]); 
    else
        texCoords.push(t[0]);

    points.push(cubeVertices[d]); 
    normals.push(n);
    texCoords.push(texCoord[0]);   
}

function quadTangent(a, b, c, d)
{
    var tangent = subtract(cubeVertices[b],cubeVertices[a]);
    var bitangent = subtract(cubeVertices[b],cubeVertices[c]);
    tangents.push(tangent);
    tangents.push(tangent);
    tangents.push(tangent);
    tangents.push(tangent);
    tangents.push(tangent);
    tangents.push(tangent);
    // bitangents.push(bitangent);
    // bitangents.push(bitangent);
    // bitangents.push(bitangent);
    // bitangents.push(bitangent);
}

// push points and texture coordinates for a cube
function cube(friesman)
{
    if(friesman)
        var t = texCoord;
    else
        var t = texCoord2;

    quad(1, 2, 3, 0, vec4(0,0,1,1), !friesman, t);
    quad(3, 2, 6, 7, vec4(1,0,0,1), !friesman, t);
    quad(4, 7, 3, 0, vec4(0,-1,0,1), !friesman, t);
    quad(1, 2, 6, 5, vec4(0,1,0,1), true, t);  // face of friesman
    quad(4, 5, 6, 7, vec4(0,0,-1,1), !friesman, t);
    quad(5, 4, 0, 1, vec4(-1,0,0,1), !friesman, t);

    if(!friesman)   // if maze
    {
        quadTangent(1, 2, 3, 0);
        quadTangent(3, 2, 6, 7);
        quadTangent(4, 7, 3, 0);
        quadTangent(1, 2, 6, 5);
        quadTangent(4, 5, 6, 7);
        quadTangent(5, 4, 0, 1);
    }
}
