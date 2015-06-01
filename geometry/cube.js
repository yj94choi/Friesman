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

var stickVertices = [
    vec4( -0.15, -0.15,  0.5, 1.0 ),
    vec4( -0.15,  0.15,  0.5, 1.0 ),
    vec4( 0.15,  0.15,  0.5, 1.0 ),
    vec4( 0.15, -0.15,  0.5, 1.0 ),
    vec4( -0.05, -0.05, -0.5, 1.0 ),
    vec4( -0.05,  0.05, -0.5, 1.0 ),
    vec4( 0.05,  0.05, -0.5, 1.0 ),
    vec4( 0.05, -0.05, -0.5, 1.0 )
];

var fireVertices = [
    vec4( -0.15, -0.15,  0.15, 1.0 ),
    vec4( -0.15,  0.15,  0.15, 1.0 ),
    vec4( 0.15,  0.15,  0.15, 1.0 ),
    vec4( 0.15, -0.15,  0.15, 1.0 ),
    vec4( -0.15, -0.15, -0.15, 1.0 ),
    vec4( -0.15,  0.15, -0.15, 1.0 ),
    vec4( 0.15,  0.15, -0.15, 1.0 ),
    vec4( 0.15, -0.15, -0.15, 1.0 )
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
function quad(a, b, c, d, n, vertices, mapface, t)
{
    points.push(vertices[a]);
    normals.push(n);
    if(mapface)
        texCoords.push(t[1]);
    else
        texCoords.push(t[0]);

    points.push(vertices[b]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[2]); 
    else
        texCoords.push(t[0]);

    points.push(vertices[c]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[3]); 
    else
        texCoords.push(t[0]);
       
    points.push(vertices[a]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[1]); 
    else
        texCoords.push(t[0]);

    points.push(vertices[c]); 
    normals.push(n);
    if(mapface)
        texCoords.push(t[3]); 
    else
        texCoords.push(t[0]);

    points.push(vertices[d]); 
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
}

// id 0 : friesman, 1: maze, 2 : stick, 3 : fire
// push points and texture coordinates for a cube
function cube(id)
{
    if(id === 1)
        var t = texCoord2;
    else
        var t = texCoord;

    if(id === 0 || id === 1)
        var vertices = cubeVertices;
    else if(id === 2)
        var vertices = stickVertices;
    else if(id === 3)
        var vertices = fireVertices;

    quad(1, 2, 3, 0, vec4(0,0,1,1), vertices, id!==0, t);
    quad(3, 2, 6, 7, vec4(1,0,0,1), vertices, id!==0, t);
    quad(4, 7, 3, 0, vec4(0,-1,0,1), vertices, id!==0, t);
    quad(1, 2, 6, 5, vec4(0,1,0,1), vertices, true, t);  // face of friesman
    quad(4, 5, 6, 7, vec4(0,0,-1,1), vertices, id!==0, t);
    quad(5, 4, 0, 1, vec4(-1,0,0,1), vertices, id!==0, t);

    if(id === 0)   // if maze
    {
        quadTangent(1, 2, 3, 0);
        quadTangent(3, 2, 6, 7);
        quadTangent(0, 3, 7, 4);
        quadTangent(1, 2, 6, 5);
        quadTangent(4, 5, 6, 7);
        quadTangent(5, 4, 0, 1);
    }
}
