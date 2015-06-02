function Mat4Stack()
{
	this.stack = [];
}

Mat4Stack.prototype.push = function(x)
{
	var newX = new mat4();
	newX = mult(newX, x);
	this.stack.push(newX);
}

Mat4Stack.prototype.pop = function()
{
	return this.stack.pop();
}

Mat4Stack.prototype.getMatrix = function()
{
	var matrix = new mat4();
	for(var i = 0; i < this.stack.length; i++)
	{
		matrix = mult(matrix, this.stack[i]);
	}
	return matrix;
}