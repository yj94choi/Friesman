function drawScore(text)
{
	var canvas = document.createElement('canvas');
	canvas.id = "hiddenCanvas";
	canvas.width = 512;
	canvas.height = 512;
	// canvas.style.display = "none";
	// var body = document.getElementsByTagName("body")[0];
	// body.appendChild(canvas);

	var textImage = document.getElementById('hiddenCanvas');
	var ctx = textImage.getContext('2d');
	ctx.beginPath();

	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "#FF0000";
	ctx.fill();

	ctx.fillStyle = 'black';
	ctx.font = "65px Arial";
	ctx.textAlign = 'center';
	ctx.fillText("Score: " + text, ctx.canvas.width / 2, ctx.canvas.height / 2);

	ctx.restore();

	var texture5 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE5);
	gl.bindTexture( gl.TEXTURE_2D, texture5 );
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, textImage );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.uniform1i(gl.getUniformLocation(program, "texture5"), 5);
}