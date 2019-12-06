## Project 1
# General Assembly Software Engineering : Pacman

## Timeframe
7 Days

## Technologies Used
* HTML5
* CSS3
* JavaScript

## Overview
Pacman is a game where you play within a rigid game space and you must eat all pips to complete the stage and progress. Meanwhile, making sure to avoid the ghosts will try to stop your game.

Game link: https://te-good.github.io/pacman/

## Instructions
1. Press space bar to begin.
2. Use the arrow keys to move up, down, left, and right.
3. You must eat all pips to progress on to stage 2.
4. To cheat to the next level, press P on the keyboard and eat one pip.
5. Stage 2 adds difficulty by constantly spinning.

![stage 2](https://i.imgur.com/ro8uirb.png)
*Stage 2 - The moving game board.*

## Process
To begin with I created the grid space which I would be working within. This was made using a loop to create the grid squares. From there, they were styled in a way to allow for a 20 by 20 playing grid. Once that was complete, I went about adding a class to each of the grid squares that I wanted to be a "wall". This is a large array that held the index number of each of the divs/grid squares in the grid.

Styling classes were used as a way to detect where the walls and objects within it were. For example, pacman had it's own class, and if the code found that the grid sqaure it was to move into was had a wall class it would not enact the move.

To get pacman to move, on keycodes for arrow keys, the class is removed from the current grid square, and moves up by 20 index places to go down, minus 20 index places to go up, minus 1 index to go left, and plus 1 to go right; and on that square, the class would be added. However, this will only happen should it be clear. Further, a loop was added to make the movement continuous until it hit a wall.

The ghost logic was the most challenging part of the process. In conclusion to much trial and error, the system I created for the ghosts were to always try and close the distance to the target grid square. And should it not be able to, it would back track until it could move and try again. Failing this, and should it be stuck for a short amount of time - the code gives the ghost a new target and it starts again. There is code for the ghost to chase the player, however, I felt that the ghosts were too powerful with this and they'd start the chase from too far away. I'd have to revisit this code to bug fix it and make it less sensitive.

Finally, I added the screens between the stage by using hidden classes, and made a second stage infinitely spin using animations.

```javascript    
randomTarget() {
  this.random399 = null
  while (!pipArray.includes(this.random399)) {
    this.random399 = Math.floor(Math.random() * 399)
  }
  this.target = this.random399
  return this.target
}

ghostWallCheck(move) {
  switch (move) {
    //left
    case 'left':
      if (!cells[this.ghostIdx - 1].classList.contains('wall') && !cells[this.ghostIdx - 1].classList.contains('ghost-banned') && this.lastPosition !== 'left') return true
      else return false
    //down
    case 'down':
      if (!cells[this.ghostIdx + width].classList.contains('wall') && this.lastPosition !== 'down') return true
      else return false
    //right
    case 'right':
      if (!cells[this.ghostIdx + 1].classList.contains('wall') && !cells[this.ghostIdx + 1].classList.contains('ghost-banned') && this.lastPosition !== 'right') return true
      else return false
    //up
    case 'up':
      if (!cells[this.ghostIdx - width].classList.contains('wall') && this.lastPosition !== 'up') return true
      else return false
  }
}
```
*Example of random grid target acquisition by the ghost. Also, the function to check whether a direction it is trying to travel is actionable.*

## Challenges
This was my debut programming project, and so there were meany obstactles that I naviagated. The logic behind moving the ghosts was a big hurdle owing to giving them the ability to chase. It took me a while, and if I were to go back now I think it could be refactored and made a lot simpler.

## Wins
This was my first independant project and I was learning/solidifying the fundamental concepts of JavaScript. The concept of classes had shown it's significance when I implemented it to create multiple ghosts, it meant I did not have to repeat a ghost object multiple times. This felt like a big win at the time as it potentially cut down the lines of code significantly. 

## Further features
If I had more time, I would first greatly refactor the code, and then look further into the ghost logic to fix their chase modes. Additionally, I'd add a restart button at the end of the game to stop all need to refreshing. And lastly, continued stages and a leaderboard to have some persistence and usage to the scores.