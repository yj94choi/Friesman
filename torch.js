var stickVertices = [
    vec4( -0.05, -0.5,  0.05, 1.0 ),
    vec4( -0.15,  0.5,  0.15, 1.0 ),
    vec4( 0.15,  0.5,  0.15, 1.0 ),
    vec4( 0.05, -0.5,  0.05, 1.0 ),
    vec4( -0.05, -0.5, -0.05, 1.0 ),
    vec4( -0.15,  0.5, -0.15, 1.0 ),
    vec4( 0.15,  0.5, -0.15, 1.0 ),
    vec4( 0.05, -0.5, -0.05, 1.0 )
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

// var texCoord = [
//     vec4(0,0, 0.0, 1.0),
//     vec4(0,1, 0.0, 1.0),
//     vec4(1,1, 0.0, 1.0),
//     vec4(1,0, 0.0, 1.0)
// ];

// push points and texture coordinates for a quadrilateral
function quad2(a, b, c, d, vertices) {
    points.push(vertices[a]);
    normals.push(normalize(vertices[a].slice(), true));
    // texCoords.push(texCoord[2]);

    points.push(vertices[b]); 
    normals.push(normalize(vertices[b].slice(), true));
    // texCoords.push(texCoord[3]); 

    points.push(vertices[c]); 
    normals.push(normalize(vertices[c].slice(), true));
    // texCoords.push(texCoord[0]); 
   
    points.push(vertices[a]); 
    normals.push(normalize(vertices[a].slice(), true));
    // texCoords.push(texCoord[2]); 

    points.push(vertices[c]); 
    normals.push(normalize(vertices[c].slice(), true));
    // texCoords.push(texCoord[0]); 

    points.push(vertices[d]); 
    normals.push(normalize(vertices[d].slice(), true));
    // texCoords.push(texCoord[1]);   
}

function cube2(vertices){
    quad2(1, 0, 3, 2, vertices);
    quad2(2, 3, 7, 6, vertices);
    quad2(3, 0, 4, 7, vertices);
    quad2(6, 5, 1, 2, vertices);
    quad2(4, 5, 6, 7, vertices);
    quad2(5, 4, 0, 1, vertices);
}