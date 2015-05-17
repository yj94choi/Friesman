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

function cube() {
    points.push(vertices[0]);
    points.push(vertices[1]);
    points.push(vertices[2]);
    points.push(vertices[6]);
    points.push(vertices[3]);
    points.push(vertices[7]);
    points.push(vertices[4]);
    points.push(vertices[6]);
    points.push(vertices[5]);
    points.push(vertices[1]);
    points.push(vertices[4]);
    points.push(vertices[0]);
    points.push(vertices[3]);
    points.push(vertices[2]);

        // vertices[0], vertices[1],
        // vertices[1], vertices[2],
        // vertices[2], vertices[3],
        // vertices[3], vertices[0],
        // vertices[4], vertices[5],
        // vertices[5], vertices[6],
        // vertices[6], vertices[7],
        // vertices[7], vertices[4],
        // vertices[0], vertices[4],
        // vertices[1], vertices[5],
        // vertices[2], vertices[6],
        // vertices[3], vertices[7],
        // vertices[8], vertices[9],
        // vertices[10], vertices[11]
}
