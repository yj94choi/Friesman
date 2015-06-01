function ObstacleObject(pos, speed, acc)
{
    // position, speed, acceleration are 3D vectors
    this.position = pos;
    this.speed = speed;
    this.acceleration = acc;
}

ObstacleObject.prototype.set = function(pos, speed)
{
    this.position = pos;
    this.speed = speed;
}

ObstacleObject.prototype.hasCollided = function(x, y, z)
{
    return (Math.abs(this.position[0] - x) <= 0.3 && Math.abs(this.position[1] - y) <= 0.3 && this.position[2] <= z);
}