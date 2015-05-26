function friesman()
{
    quad( 1, 0, 3, 2, 1);
    quad( 2, 3, 7, 6, 2);
    quad( 3, 0, 4, 7, 3);
    quad( 6, 5, 1, 2, 4);
    quad( 4, 5, 6, 7, 5);
    quad( 5, 4, 0, 1, 6);
}

function quad(a, b, c, d, e) 
{
    if(e===1)
    {
        points.push(brick_vertices[a]); 
        normals.push(normalize(brick_vertices[a]), true); 
        texCoordsArray.push(texCoord[2]);

        points.push(brick_vertices[b]); 
        normals.push(normalize(brick_vertices[b]), true);
        texCoordsArray.push(texCoord[3]); 

        points.push(brick_vertices[c]); 
        normals.push(normalize(brick_vertices[c]), true);
        texCoordsArray.push(texCoord[0]); 
       
        points.push(brick_vertices[a]); 
        normals.push(normalize(brick_vertices[a]), true);
        texCoordsArray.push(texCoord[2]); 

        points.push(brick_vertices[c]); 
        normals.push(normalize(brick_vertices[c]), true);
        texCoordsArray.push(texCoord[0]); 

        points.push(brick_vertices[d]); 
        normals.push(normalize(brick_vertices[d]), true);
        texCoordsArray.push(texCoord[1]); 
    }
    else
    {
        points.push(brick_vertices[a]); 
        normals.push(normalize(brick_vertices[a]), true);
        texCoordsArray.push(texCoord[0]);

        points.push(brick_vertices[b]); 
        normals.push(normalize(brick_vertices[b]), true);
        texCoordsArray.push(texCoord[0]); 

        points.push(brick_vertices[c]); 
        normals.push(normalize(brick_vertices[c]), true);
        texCoordsArray.push(texCoord[0]); 
       
        points.push(brick_vertices[a]); 
        normals.push(normalize(brick_vertices[a]), true);
        texCoordsArray.push(texCoord[0]); 

        points.push(brick_vertices[c]); 
        normals.push(normalize(brick_vertices[c]), true);
        texCoordsArray.push(texCoord[0]); 

        points.push(brick_vertices[d]); 
        normals.push(normalize(brick_vertices[d]), true);
        texCoordsArray.push(texCoord[0]); 
     }
}

var brick_vertices = [
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
    vec4(1.0,0.0,0.0,1.0),
    vec4(1.0,1.0,0.0,1.0),
    vec4(0.0,1.0,0.0,1.0),
    vec4(0.0,0.0,0.0,1.0)
];