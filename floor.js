var floors = [
    // translate(7, 9, 0), translate(8, 9, 0), translate(9, 9, 0), translate(10, 9, 0), translate(11, 9, 0), translate(12, 9, 0), translate(13, 9, 0),
    // translate(7, 10, 0), translate(13, 10, 0),
    // translate(7, 11, 0), translate(9, 11, 0), translate(10, 11, 0), translate(11, 11, 0), translate(13, 11, 0),
    // translate(7, 12, 0), translate(10, 12, 0), translate(13, 12, 0),
    // translate(7, 13, 0), translate(8, 13, 0), translate(9, 13, 0), translate(10, 13, 0), translate(11, 13, 0), translate(12, 13, 0), translate(13, 13, 0)
];

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
function floor(a, b, c, d, n) 
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
