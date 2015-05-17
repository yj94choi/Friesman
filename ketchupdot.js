function triangle(a, b, c, flat) {
    points.push(a);
    points.push(c);
    points.push(b);

    if(flat) {      // for flat shading, push 3 per-primitive normal vectors
        for(var i = 0; i < 3; i++)
            normals.push(vec4(normalize(cross(subtract(c,a),subtract(b,a)))));
    }
    else {          // for smooth shading, push per-vertex normal vectors
        normals.push(normalize(a,true));
        normals.push(normalize(c,true));
        normals.push(normalize(b,true));
    }
}

function divideTriangle(a, b, c, count, flat) {
    if(count > 0) {
        var ab = normalize(mix(a,b,0.5), true);
        var ac = normalize(mix(a,c,0.5), true);
        var bc = normalize(mix(b,c,0.5), true);
        divideTriangle(a,ab,ac,count-1,flat);
        divideTriangle(ab,b,bc,count-1,flat);
        divideTriangle(bc,c,ac,count-1,flat);
        divideTriangle(ab,bc,ac,count-1,flat);
    }
    else {
        triangle(a,b,c,flat);
    }
}

function tetrahedron(a, b, c, d, n, flat) {
    divideTriangle(a,b,c,n,flat);
    divideTriangle(d,c,b,n,flat);
    divideTriangle(a,d,b,n,flat);
    divideTriangle(a,c,d,n,flat);
}

// Sphere generation function from the book, extended to generate normal vectors
// num determines the complexity of the geometry
// if flat is true, generate normal vectors for flat shading. otherwise, for smooth shading
// REQUIREMENT 3,4
function ketchupdot(num, flat) {
    var va = vec4(0.0, 0.0, -1.0, 1);
    var vb = vec4(0.0, 0.942809, 0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4(0.816497, -0.471405, 0.333333, 1);
    tetrahedron(va, vb, vc, vd, num, flat);
}