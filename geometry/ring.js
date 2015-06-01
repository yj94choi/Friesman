// call using:
// makeTorus(0.7, 0.3, 150, 20, 1.0);

function makeTorus(r, sr, n, sn, k)
{
  // Iterates along the big circle and then around a section
  for(var i=0;i<n;i++)
    for(var j=0;j<sn+1*(i==n-1);j++)
    {
      // Pre-calculation of angles
      var a =  2*Math.PI*(i+j/sn)/n;
      var a2 = 2*Math.PI*(i+j/sn+k)/n;
      var sa = 2*Math.PI*j/sn;
      
      // Coordinates on the surface of the torus  
      var x = (r+sr*Math.cos(sa))*Math.cos(a); // X
      var y = (r+sr*Math.cos(sa))*Math.sin(a); // Y
      var z = sr*Math.sin(sa);                 // Z
      points.push(vec4(x,y,z,1.0));
      var nx = x - (r*Math.cos(a));
      var ny = y - (r*Math.sin(a));
      normals.push(vec4(nx,ny,z,1.0));

      // Second vertex to close triangle
      var x = (r+sr*Math.cos(sa))*Math.cos(a2); // X
      var y = (r+sr*Math.cos(sa))*Math.sin(a2); // Y
      var z = sr*Math.sin(sa);                  // Z
      points.push(vec4(x,y,z,1.0));
      var nx = x - (r*Math.cos(a));
      var ny = y - (r*Math.sin(a));
      normals.push(vec4(nx,ny,z,1.0));
    }
}
