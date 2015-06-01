var floorVertices = [
    vec4( -0.5, -0.5,  -0.5, 1.0 ),
    vec4( -0.5,  0.5,  -0.5, 1.0 ),
    vec4( 0.5,  0.5,  -0.5, 1.0 ),
    vec4( 0.5, -0.5,  -0.5, 1.0 )
];

var texCoord = [
    vec4(0, 0, 0.0, 1.0),
    vec4(0, 1, 0.0, 1.0),
    vec4(1, 1, 0.0, 1.0),
    vec4(1, 0, 0.0, 1.0)
];

// push points and texture coordinates for a quadrilateral
function square(a, b, c, d, n) 
{
    points.push(floorVertices[a]);
    normals.push(n);
    texCoords.push(texCoord[0]);

    points.push(floorVertices[b]); 
    normals.push(n);
    texCoords.push(texCoord[1]); 

    points.push(floorVertices[c]); 
    normals.push(n);
    texCoords.push(texCoord[2]); 
   
    points.push(floorVertices[a]); 
    normals.push(n);
    texCoords.push(texCoord[0]); 

    points.push(floorVertices[c]); 
    normals.push(n);
    texCoords.push(texCoord[2]); 

    points.push(floorVertices[d]); 
    normals.push(n);
    texCoords.push(texCoord[3]);   
}
