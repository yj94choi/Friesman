function brick()
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
     normals.push(brick_vertices[a]) 
     texCoordsArray.push(texCoord[2]);

     points.push(brick_vertices[b]); 
     normals.push(brick_vertices[b]);
     texCoordsArray.push(texCoord[3]); 

     points.push(brick_vertices[c]); 
     normals.push(brick_vertices[c]);
     texCoordsArray.push(texCoord[0]); 
   
     points.push(brick_vertices[a]); 
     normals.push(brick_vertices[a]);
     texCoordsArray.push(texCoord[2]); 

     points.push(brick_vertices[c]); 
     normals.push(brick_vertices[c]);
     texCoordsArray.push(texCoord[0]); 

     points.push(brick_vertices[d]); 
     normals.push(brick_vertices[d]);
     texCoordsArray.push(texCoord[1]); 
     }
     else
     {
     points.push(brick_vertices[a]); 
     normals.push(brick_vertices[a]);
     texCoordsArray.push(texCoord[0]);

     points.push(brick_vertices[b]); 
     normals.push(brick_vertices[b]);
     texCoordsArray.push(texCoord[0]); 

     points.push(brick_vertices[c]); 
     normals.push(brick_vertices[c]);
     texCoordsArray.push(texCoord[0]); 
   
     points.push(brick_vertices[a]); 
     normals.push(brick_vertices[a]);
     texCoordsArray.push(texCoord[0]); 

     points.push(brick_vertices[c]); 
     normals.push(brick_vertices[c]);
     texCoordsArray.push(texCoord[0]); 

     points.push(brick_vertices[d]); 
     normals.push(brick_vertices[d]);
     texCoordsArray.push(texCoord[0]); 
     }
}

var brick_vertices = 
    [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
    ];