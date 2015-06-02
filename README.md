# Friesman

UCLA CS174A Final Project

### Team Members
* YooJung Choi
* Dong Joon Kim
* Yungunn Ko
* Brian Lee
* Gee Won Jo

### Controls
* Arrow keys: move
* Enter: pause
* Spacebar: change camera view

## Project Description
Friesman is a 3D adaptation of Pac-man. A highly intelligent fast food known as Friesman is sent to a suspicious restaurant on 922 Gayley Ave. Los Angeles after someone from NIA (Nano-Intelligence Agency) reported a security breach. There, Friesman learns that the alert came after test subjects. Onion rings were purposefully injected with an alien DNA, broken free, and begun contaminating foods. Friesman tries to save the world from the onion rings' wicked plan, and so the story goes on!

The back-end of the game was implemented in JavaScript, with a hint of object-oriented programming style. The back-end of the game is mainly divided up in 3 different objects: board, Friesman, and enemies. The enemies also have been implemented with 2 different algorithms for more fun and difficulty: Smart Enemy and Dumb Enemy. Out of 4 enemies, 3 of them are dumb enemies, and 1 of them is a smart enemy. The board is implemented using a 2D string array and previous states of where the characters currently resides are also saved in another string array size of 5.

The front-end of the game was implemented in JavaScript and HTML, using WebGL Library, also with a hint of object-oriented programming style. The front-end of the game is mainly divided up in many different objects: Maze, Fire, Floor, Friesman, Arms, SpreadDot, Enemy, Stick, Obstacle, Shade, Door, and Title.

### Required Topics
* Geometry: used sphere, cube, square, and torus. Using scaling and other transform matrices, we implemented the projectile rock and the prism for Friesman and the torch stick.
* Camera position changes: implemented the bird’s-eye view (entire map), zoomed-in bird’s-eye view, and the first-person point of view (slightly above Friesman looking down at a 30­degree angle).
* Lighting: implemented one light source at the middle of the map. All objects in the scene are lighted using Phong-Blinn Shading model.
* Texture mapping: is applied to the start, win, and game-over pages, the floor of the map, the fire of the torch, and the face of Friesman. 

### Advanced Topics
* Collision detection: The collision detection was implemented for the obstacle of the game. If the obstacle had same x and y position of the friesman, we compared the z-component of the obstacle height and checked if it was within the range of friesman’s height. Also, the obstacle would reset to its initial position, if it reached the ground level.  
* Bump/Normal mapping: The walls of the maze are applied a normal map to give it a sofa-like appearance.
* Blending: The blending effect was implemented for the door and the start screen of the game.
* Physics simulation: The obstacles were implemented with particle physics. Each of the obstacle has accelerations towards the negative z-axis and constant velocity towards the positive or negative x-axis. This was done by giving the obstacle object acceleration, speed, and position vectors and translating the obstacle accordingly. Additionally, the shade of the obstacles was implemented with flat sphere at the z-axis, having same constant velocity as that of obstacle. Using scaling factor to the shade, it give more realistic shade effect.
* Scene graph: Friesman is modeled in a hierarchical way using a stack. The hierarchy is: root -> body & 2 arms -> 2 hands. Each of the hands are attached to the forearms, which are in turn connected to shoulder which moves repeatedly. All of them are applied the root transformation which defines how the Friesman moves and rotates.
