console.log('JS loaded')

window.addEventListener('DOMContentLoaded', () => {

  const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 269, 270, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
  const pipArray = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 48, 51, 58, 61, 68, 71, 78, 81, 88, 91, 98, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 121, 138, 141, 142, 143, 144, 145, 146, 153, 154, 155, 156, 157, 158, 166, 173, 186, 193, 206, 213, 226, 233, 241, 242, 243, 244, 245, 246, 247, 248, 251, 252, 253, 254, 255, 256, 257, 258, 261, 266, 268, 271, 273, 278, 281, 286, 288, 289, 290, 291, 293, 298, 301, 306, 313, 318, 321, 322, 323, 324, 325, 326, 333, 334, 335, 336, 337, 338, 341, 358, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378 ]
  const ghostBanned = [185, 194]
  //grid width
  const width = 20
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const cells = []
  // inital character placement (array index)
  let playerIdx = 290
  //intitalising player movement setInterval()
  let playerMoving = null
  //initalising ghost one random movement
  let ghostOneMoving = null
  //intialising ghoss one targeted movement
  let ghostOneTargetMove = null
  let ghostOneTargetMove1 = null
  //points coutner
  let points = 0
  // character speed
  const speed = 150

  //ghost 1 location
  let ghostOneIdx = 258

  

  // grid creation
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    // grid numbers
    cell.innerHTML = `${i}`
    grid.appendChild(cell)
    cells.push(cell)
  }

  // wall creation
  cells.forEach((item, index) => {
    return wallArray.includes(index) ? item.classList.add('wall') : 0
  })
  // ghost banned move cells
  cells.forEach((item, index) => {
    return ghostBanned.includes(index) ? item.classList.add('ghost-banned') : 0
  })
  
  // inner class appending creation
  cells.forEach((item, index) => {
    const cell = document.createElement('section')
    return pipArray.includes(index) ? item.appendChild(cell).classList.add('inner') : 0
  })
  // pip creation
  cells.forEach((item, index) => {
    const cell = document.createElement('section')
    return pipArray.includes(index) ? item.appendChild(cell).classList.add('pip') : 0
  })


  // initial character placement
  cells[playerIdx].classList.add('player')
  // initial ghost one placement
  cells[ghostOneIdx].classList.add('ghost')

  //X Y Player Co-ordinates
  const x = playerIdx % width
  const y = Math.floor(playerIdx / width)

  // KEY EVENT LISTENER
  document.addEventListener('keyup', e => {

    console.log(e.keyCode)
    

    // cells[playerIdx].classList.remove('player')

    

    switch (e.keyCode) {
      //left
      case 37: 
        if (!cells[playerIdx - 1].classList.contains('wall')) movementPlayer(37, 'player')
        break
      //up
      case 38:
        if (!cells[playerIdx - width].classList.contains('wall')) movementPlayer(38, 'player')
        break
      //right
      case 39:
        if (!cells[playerIdx + 1].classList.contains('wall')) movementPlayer(39, 'player')
        break
      //down
      case 40: 
        if (!cells[playerIdx + width].classList.contains('wall')) movementPlayer(40, 'player')
        break
    }

    // cells[playerIdx].classList.add('player')

    
  }) //END OF EVENT LISTENER

  function movementPlayer(keyCode, characterClass) {

    //clearing previous movement
    clearInterval(playerMoving)
    //loop
    playerMoving = setInterval(() => {
      
    
      // moving left
      if (keyCode === 37) {
        console.log(`player index ${playerIdx}`)
        //removing pips and accumalating points
        pipCount()
        //removing preivous rotation class
        removePreviousRotation(playerIdx)
        //remove pacman
        cells[playerIdx].classList.remove(characterClass)
        // if a wall ahead
        if (cells[playerIdx - 1].classList.contains('wall')) {
          //add pacman
          cells[playerIdx].classList.add(characterClass)
          // rotating div
          cells[playerIdx].classList.add('rotate-left')
          // stop loop
          return clearInterval(playerMoving)
        }
        //move pacman left by 1
        playerIdx -= 1
        //if at middle opening, loop to opposite side
        if (playerIdx === 180) playerIdx = 199
        // add pacman
        cells[playerIdx].classList.add(characterClass)
        // rotating div
        cells[playerIdx].classList.add('rotate-left')
      }

      // moving right
      if (keyCode === 39) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        removePreviousRotation(playerIdx)
        cells[playerIdx].classList.remove(characterClass)
        if (cells[playerIdx + 1].classList.contains('wall')) {
          cells[playerIdx].classList.add(characterClass)
          cells[playerIdx].classList.add('rotate-right')
          return clearInterval(playerMoving)
        }
        playerIdx += 1
        if (playerIdx === 199) playerIdx = 180
        cells[playerIdx].classList.add(characterClass)
        cells[playerIdx].classList.add('rotate-right')
      }

      //moving up
      if (keyCode === 38) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        removePreviousRotation(playerIdx)
        cells[playerIdx].classList.remove(characterClass)
        if (cells[playerIdx - width].classList.contains('wall')) {
          cells[playerIdx].classList.add(characterClass)
          cells[playerIdx].classList.add('rotate-up')
          return clearInterval(playerMoving)
        }
        playerIdx -= width
        cells[playerIdx].classList.add(characterClass)
        cells[playerIdx].classList.add('rotate-up')
      }
      //moving down
      if (keyCode === 40) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        removePreviousRotation(playerIdx)
        cells[playerIdx].classList.remove(characterClass)
        if (cells[playerIdx + width].classList.contains('wall')) {
          cells[playerIdx].classList.add(characterClass)
          cells[playerIdx].classList.add('rotate-down')
          return clearInterval(playerMoving)
        }
        playerIdx += width
        cells[playerIdx].classList.add(characterClass)
        cells[playerIdx].classList.add('rotate-down')
      }
      stageComplete(points)
    }, speed)
  }

  function pipCount() {
    if (cells[playerIdx].children[1]){
      if (cells[playerIdx].children[1].classList.contains('pip')) {
        points++
        score.innerHTML = `Score:${points}`
        console.log(`You have ${points} points!`)
        return cells[playerIdx].children[1].classList.remove('pip')
      }
    } else return console.log('false')
    // return cells[playerIdx].classList.remove('.pip')
  }

  function stageComplete(points) {
    if (points === 134) {
      score.innerHTML = 'STAGE COMPLETE'
      return console.log('STAGE COMPLETE')
    }
  }

  function removePreviousRotation(charIdx) {
    cells[charIdx].classList.remove('rotate-right')
    cells[charIdx].classList.remove('rotate-down')
    cells[charIdx].classList.remove('rotate-left')
    cells[charIdx].classList.remove('rotate-up')
  }


  //GHOSTS
  // ***************************
  // GHOST TOTAL RANDOM MOVEMENT
  // ***************************

  //ghost movement
  // function movementGhost(keyCode, characterClass) {

  //   //clearing previous movement
  //   clearInterval(ghostOneMoving)
  //   //loop
  //   ghostOneMoving = setInterval(() => {
      
    
  //     // moving left
  //     if (keyCode === 37) {
  //       console.log(`ghostOne index ${ghostOneIdx}`)
  //       //removing pips and accumalating points
  //       pipCount()
  //       //removing preivous rotation class
  //       removePreviousRotation(ghostOneIdx)
  //       //remove pacman
  //       cells[ghostOneIdx].classList.remove(characterClass)
  //       // if a wall ahead
  //       if (cells[ghostOneIdx - 1].classList.contains('wall')) {
  //         //add pacman
  //         cells[ghostOneIdx].classList.add(characterClass)
  //         // rotating div
  //         // cells[ghostIdx].classList.add('rotate-left')
  //         // stop loop
  //         return clearInterval(ghostOneMoving)
  //       }
  //       //move pacman left by 1
  //       ghostOneIdx -= 1
  //       //if at middle opening, loop to opposite side
  //       if (ghostOneIdx === 180) ghostOneIdx = 199
  //       // add pacman
  //       cells[ghostOneIdx].classList.add(characterClass)
  //       // rotating div
  //       // cells[ghostIdx].classList.add('rotate-left')
  //     }

  //     // moving right
  //     if (keyCode === 39) {
  //       console.log(`ghostOne index ${ghostOneIdx}`)
  //       pipCount()
  //       removePreviousRotation(ghostOneIdx)
  //       cells[ghostOneIdx].classList.remove(characterClass)
  //       if (cells[ghostOneIdx + 1].classList.contains('wall')) {
  //         cells[ghostOneIdx].classList.add(characterClass)
  //         // cells[ghostIdx].classList.add('rotate-right')
  //         return clearInterval(ghostOneMoving)
  //       }
  //       ghostOneIdx += 1
  //       if (ghostOneIdx === 199) ghostOneIdx = 180
  //       cells[ghostOneIdx].classList.add(characterClass)
  //       // cells[ghostIdx].classList.add('rotate-right')
  //     }

  //     //moving up
  //     if (keyCode === 38) {
  //       console.log(`ghostOne index ${ghostOneIdx}`)
  //       pipCount()
  //       removePreviousRotation(ghostOneIdx)
  //       cells[ghostOneIdx].classList.remove(characterClass)
  //       if (cells[ghostOneIdx - width].classList.contains('wall')) {
  //         cells[ghostOneIdx].classList.add(characterClass)
  //         // cells[ghostIdx].classList.add('rotate-up')
  //         return clearInterval(ghostOneMoving)
  //       }
  //       ghostOneIdx -= width
  //       cells[ghostOneIdx].classList.add(characterClass)
  //       // cells[ghostIdx].classList.add('rotate-up')
  //     }
  //     //moving down
  //     if (keyCode === 40) {
  //       console.log(`ghostOne index ${ghostOneIdx}`)
  //       pipCount()
  //       removePreviousRotation(ghostOneIdx)
  //       cells[ghostOneIdx].classList.remove(characterClass)
  //       if (cells[ghostOneIdx + width].classList.contains('wall')) {
  //         cells[ghostOneIdx].classList.add(characterClass)
  //         // cells[ghostIdx].classList.add('rotate-down')
  //         return clearInterval(ghostOneMoving)
  //       }
  //       ghostOneIdx += width
  //       cells[ghostOneIdx].classList.add(characterClass)
  //       // cells[ghostIdx].classList.add('rotate-down')
  //     }
  //     // stageComplete(points)
  //   }, speed)

  // }

  // ghostOneBehaviour()
  // function ghostOneBehaviour(){
  //   setInterval(() => {
  //     const key = keyGenerator()
  //     console.log(key)
  //     movementGhost(key , 'ghost', ghostOneIdx)
  //   }, 500)
    
  // }

  // function keyGenerator() {
  //   const randomFour = Math.floor(Math.random() * 4)
  //   return randomFour + 37
  // }


  // ***********************
  // GHOST TARGETED MOVEMENT
  // ***********************
  const ghostX = ghostOneIdx % width
  const ghostY = Math.floor(ghostOneIdx / width)
  console.log(`Ghost X:${ghostX}`, `Y:${ghostY}`)
  
  const target = 241
  const targetX = target % width
  console.log(targetX)
  const targetY = Math.floor(target / width)
  console.log(targetY)
  console.log(`Target X:${targetX}`, `Y:${targetY}`)
  // horizontal or vertical
  let lastAxis = null
  // up left down or right
  let lastMove = null

  
  
  // if target - ghostLoc is a minus number its above or left, a positive = up or right
  // try and bring the higher of X or Y down, 
  // is X or Y larger. If Y do start with functionX which will call Y after it
  // function ghostMoveY(direction)
  // function ghostMoveX(direction)
  //if that fails try the other, 
  //if that fails go in the other direction of the closest axis, 
  //but if we came from that direction go in the other
  
  
  // console.log(ghostXDirection(ghostOneIdx + 1))
  // console.log('math', Math.abs(ghostXDirection(ghostOneIdx)) - 1)

  
  
  //if both X and Y are 0 then call new target
  // backtrackfunction
  // if (x < y && lastdirection wasnt horizontal) ?  run horizontalmovement : verticalmovement
  // if (Math.abs(yDifference) < Math.abs(xDifference) && lastDirection !== 'horizontal') {
    
  ghostOneTargetMove1 = setInterval(() => {
    const xDifference = ghostXDirection(ghostOneIdx)
    const yDifference = ghostYDirection(ghostOneIdx)
  
    // is X or Y a smaller distance?
    console.log('xDifference:', Math.abs(xDifference))
    console.log('yDifference', yDifference)
    // console.log('x', Math.abs(xDifference))
    // console.log('y', Math.abs(yDifference))
    // console.log(lastMove)
    // console.log(lastAxis)
    // console.log(xDifference)

    
    // add the loop road enterances 185 and 194 to banned movements for ghost

    console.log(Math.abs(xDifference) > Math.abs(yDifference))

    switch (Math.abs(xDifference) > Math.abs(yDifference)) {
      //if x if a minus number - will need to add
      // if x greater than y (therefore do X axis first)
      case true:
        // is y greater than 0
        if (xDifference > 0) {
          // if so check if I can go down
          if (ghostWallCheck('right')) {
            console.log(1, 'right')
            ghostRightByOne()
            //if not then if x is a postive number, try right
          } else if (yDifference > 0) {
            console.log(12)
            ghostDownByOne()
            // if not then if x is a negative number try left
          } else if (yDifference < 0) {
            console.log(13)
            ghostUpByOne()
          }
        }
        if (xDifference < 0) {
          if (ghostWallCheck('left')) {
            console.log(1, 'left')
            ghostLeftByOne()
          } else if (yDifference > 0) {
            console.log(22)
            ghostDownByOne()
          } else if (yDifference < 0) {
            console.log(23)
            ghostUpByOne()
          }
        }
        break
      // y is greater than x (therefore do Y axis first)
      case false:
        console.log(xDifference)
        // is y greater than 0
        if (yDifference > 0) {
          // if so check if I can go down
          if (ghostWallCheck('down')) {
            console.log(1, 'down')
            ghostDownByOne()
            //if not then if x is a postive number, try right
          } else if (xDifference > 0) {
            console.log(12)
            ghostRightByOne()
            // if not then if x is a negative number try left
          } else if (xDifference < 0) {
            console.log(13)
            ghostLeftByOne()
          }
        }
        if (yDifference < 0) {
          if (ghostWallCheck('up')) {
            console.log(1, 'up')
            ghostUpByOne()
          } else if (xDifference > 0) {
            console.log(22)
            ghostRightByOne()
          } else if (xDifference < 0) {
            console.log(23)
            ghostLeftByOne()
          }
        }
        break
    }
    

    // if ((Math.abs(yDifference) < Math.abs(xDifference) && lastDirection !== 'horizontal') || lastDirection === 'vertical') {
    //   console.log('y is lower than x')
    //   horizontalGhostMovement(xDifference)
    // } else if ((Math.abs(xDifference) < Math.abs(yDifference) && lastDirection !== 'vertical') || lastDirection === ' horizontal') {
    //   console.log('x is lower than y')
    //   verticalGhostMovement(yDifference)
    // } else if (xDifference === 0 & yDifference === 0) {
    //   console.log('at target')
    //   clearInterval(ghostOneTargetMove1)
    // } else {
    //   const zeroOrOne = Math.floor(Math.random * 2)
    //   zeroOrOne === 0 ? horizontalGhostMovement(xDifference) : verticalGhostMovement(yDifference)
    // }

  }, 500)

  // function horizontalGhostMovement(ghostXDirection) {
  //   if (ghostXDirection > 0) {
  //     lastMove = 'right'
  //     ghostRightByOne()
  //   }
  //   if (ghostXDirection < 0) {
  //     lastMove = 'left'
  //     ghostLeftByOne()
  //   }
  // }
  // function horizontalGhostMovement(ghostXDirection) {
  //   // console.log('hi')
  //   lastAxis = 'horizontal'
  //   if (ghostXDirection > 0 && lastMove !== 'right') {
  //     lastMove = 'right'
  //     ghostRightByOne()
  //     // console.log(ghostXDirection)
  //   }
  //   if (ghostXDirection < 0 && lastMove !== 'left') {
  //     lastMove = 'left'
  //     ghostLeftByOne()
  //     // console.log(ghostXDirection)
  //   }
  // }

  // function verticalGhostMovement(ghostYDirection) {
  //   // console.log('bye')
  //   lastAxis = 'vertical'
  //   if (ghostYDirection > 0 && lastMove !== 'up') {
  //     lastMove = 'down'
  //     ghostDownByOne()
  //     // console.log(ghostYDirection)
  //   }
  //   if (ghostYDirection < 0 && lastMove !== 'down') {
  //     lastMove = 'up'
  //     ghostUpByOne()
  //     // console.log(ghostYDirection)
  //   }

  // }

  function ghostWallCheck(move) {
    console.log(ghostOneIdx + 1)
    console.log('wall', !cells[ghostOneIdx - 1].classList.contains('wall'))
    console.log('ghost', !cells[ghostOneIdx - 1].classList.contains('ghost-banned'))
    switch (move) {
      //left
      case 'left': 
        if (!cells[ghostOneIdx - 1].classList.contains('wall') && !cells[ghostOneIdx - 1].classList.contains('ghost-banned')) return true
        else return false
      //down
      case 'down':
        if (!cells[ghostOneIdx + width].classList.contains('wall')) return true
        else return false
      //right
      case 'right':
        if (!cells[ghostOneIdx + 1].classList.contains('wall') && !cells[ghostOneIdx + 1].classList.contains('ghost-banned')) return true
        // else if (!cells[ghostOneIdx + 1].classList.contains('wall')) return true
        else return false
      //up
      case 'up':
        if (!cells[ghostOneIdx - width].classList.contains('wall')) return true
        else return false
    }
  }

  // horizontalGhostMovement(ghostXdirction())
  //   last direction = horizontal
  //   if its a positive && the last move wasnt left
  //       if theres a wall 
  //       move right++
  //   if its a negative move left && the last move wasnt right
  //     if theres a wall
  //       move right++

  // if moving one right reduces the number
  // if (ghostXDirection(ghostOneIdx + 1) === Math.abs(ghostXDirection(ghostOneIdx)) - 1) {
  //   console.log('true')
  // }




  
  // ghostTargetMovement()
  // function ghostTargetMovement() {
    
  //   clearInterval(ghostOneTargetMove)
  //   // if XY === XY stop/call new target
  //   ghostOneTargetMove = setInterval(() => {
  //     // ghost moving up towards target
  //     if (!!Math.abs(ghostYDirection(ghostOneIdx)) && !cells[ghostOneIdx - width].classList.contains('wall') && lastMove !== 'down') ghostUpByOne(ghostOneTargetMove), lastMove = 'up'
  //     // ghost moving down towards target
  //     else if (Math.abs(ghostYDirection(ghostOneIdx)) && !cells[ghostOneIdx + width].classList.contains('wall') && lastMove !== 'up') ghostDownByOne(ghostOneTargetMove)
  //     // ghost moving right towards target
  //     else if (Math.abs(ghostXDirection(ghostOneIdx)) && !cells[ghostOneIdx + 1].classList.contains('wall') && lastMove !== 'left') ghostRightByOne(ghostOneTargetMove)
  //     else if (!!Math.abs(ghostXDirection(ghostOneIdx)) && !cells[ghostOneIdx - 1].classList.contains('wall') && lastMove !== 'right') ghostLeftByOne(ghostOneTargetMove)
  //     else {
  //       console.log(lastMove)
  //       clearInterval(ghostOneTargetMove)
  //       console.log(`ghostOne index ${ghostOneIdx}`)
  //       //backtrack(move in an axis which is closest to X or Y of target)
  //       return console.log('stuck')
  //     }
  //   }, speed) 
  // }

  //direction based upon target location
  function ghostYDirection(ghostOneIdx){
    //GhostY > targetY ?
    if (Math.floor(ghostOneIdx / width) > Math.floor(target / width)) {
      // console.log('up', Math.floor(target / width) - Math.floor(ghostOneIdx / width))
      return targetY - Math.floor(ghostOneIdx / width)
      // ghostY < targetY ?
    } else if (Math.floor(ghostOneIdx / width) < Math.floor(target / width)) {
      // console.log('down', Math.floor(target / width) - Math.floor(ghostOneIdx / width))
      return targetY - Math.floor(ghostOneIdx / width)
    } else return 0
  }
  //direction based upon target location
  function ghostXDirection(ghostOneIdx){
    //ghostX > targetX
    if ((ghostOneIdx % width) > (target % width)) {
      // console.log('left', (target % width) - (ghostOneIdx % width))
      return targetX - (ghostOneIdx % width)
      // targetX > ghostX
    } else if ((target % width) > (ghostOneIdx % width)) {
      // console.log('right', (target % width) - (ghostOneIdx % width))
      return targetX - (ghostOneIdx % width)
    } else return 0
  }

  // GHOST INDIVIDUAL MOVEMENTS
  function ghostUpByOne(clearIntervalFunctionName) {
    removePreviousRotation(ghostOneIdx)
    cells[ghostOneIdx].classList.remove('ghost')
    if (cells[ghostOneIdx - width].classList.contains('wall')) {
      console.log(`ghostOne index ${ghostOneIdx}`)
      cells[ghostOneIdx].classList.add('ghost')
      return clearInterval(clearIntervalFunctionName)
    }
    ghostOneIdx -= width
    cells[ghostOneIdx].classList.add('ghost')
  }
  function ghostRightByOne(clearIntervalFunctionName) {
    removePreviousRotation(ghostOneIdx)
    cells[ghostOneIdx].classList.remove('ghost')
    if (cells[ghostOneIdx + 1].classList.contains('wall') || cells[ghostOneIdx + 1].classList.contains('ghost-banned')) {
      console.log(`ghostOne index ${ghostOneIdx}`)
      cells[ghostOneIdx].classList.add('ghost')
      return clearInterval(clearIntervalFunctionName)
    }
    ghostOneIdx += 1
    if (ghostOneIdx === 199) ghostOneIdx = 180
    cells[ghostOneIdx].classList.add('ghost')
  }
  function ghostDownByOne(clearIntervalFunctionName) {
    removePreviousRotation(ghostOneIdx)
    cells[ghostOneIdx].classList.remove('ghost')
    if (cells[ghostOneIdx + width].classList.contains('wall')) {
      console.log(`ghostOne index ${ghostOneIdx}`)
      cells[ghostOneIdx].classList.add('ghost')
      return clearInterval(clearIntervalFunctionName)
    }
    ghostOneIdx += width
    cells[ghostOneIdx].classList.add('ghost')
  }
  function ghostLeftByOne(clearIntervalFunctionName) {
    removePreviousRotation(ghostOneIdx)
    cells[ghostOneIdx].classList.remove('ghost')
    if (cells[ghostOneIdx - 1].classList.contains('wall') || cells[ghostOneIdx - 1].classList.contains('ghost-banned')) {
      console.log(`ghostOne index ${ghostOneIdx}`)
      cells[ghostOneIdx].classList.add('ghost')
      return clearInterval(clearIntervalFunctionName)
    }
    ghostOneIdx -= 1
    if (ghostOneIdx === 180) ghostOneIdx = 199
    cells[ghostOneIdx].classList.add('ghost')
  }




  //if playerIdx === any ghost index trigger game over
}) // END OF DOMContentLoaded




//backup movement function save
// function movement(keyCode, characterClass) {

//   //clearing previous movement
//   clearInterval(moving)
//   //loop
//   moving = setInterval(() => {
    
  
//     // moving left
//     if (keyCode === 37) {
//       console.log(`player index ${playerIdx}`)
//       //removing pips and accumalating points
//       pipCount()
//       //removing preivous rotation class
//       removePreviousRotation()
//       //remove pacman
//       cells[playerIdx].classList.remove(characterClass)
//       // if a wall ahead
//       if (cells[playerIdx - 1].classList.contains('wall')) {
//         //add pacman
//         cells[playerIdx].classList.add(characterClass)
//         // rotating div
//         cells[playerIdx].classList.add('rotate-left')
//         // stop loop
//         return clearInterval(moving)
//       }
//       //move pacman left by 1
//       playerIdx -= 1
//       //if at middle opening, loop to opposite side
//       if (playerIdx === 180) playerIdx = 199
//       // add pacman
//       cells[playerIdx].classList.add(characterClass)
//       // rotating div
//       cells[playerIdx].classList.add('rotate-left')
//     }

//     // moving right
//     if (keyCode === 39) {
//       console.log(`player index ${playerIdx}`)
//       pipCount()
//       removePreviousRotation()
//       cells[playerIdx].classList.remove(characterClass)
//       if (cells[playerIdx + 1].classList.contains('wall')) {
//         cells[playerIdx].classList.add(characterClass)
//         cells[playerIdx].classList.add('rotate-right')
//         return clearInterval(moving)
//       }
//       playerIdx += 1
//       if (playerIdx === 199) playerIdx = 180
//       cells[playerIdx].classList.add(characterClass)
//       cells[playerIdx].classList.add('rotate-right')
//     }

//     //moving up
//     if (keyCode === 38) {
//       console.log(`player index ${playerIdx}`)
//       pipCount()
//       removePreviousRotation()
//       cells[playerIdx].classList.remove(characterClass)
//       if (cells[playerIdx - width].classList.contains('wall')) {
//         cells[playerIdx].classList.add(characterClass)
//         cells[playerIdx].classList.add('rotate-up')
//         return clearInterval(moving)
//       }
//       playerIdx -= width
//       cells[playerIdx].classList.add(characterClass)
//       cells[playerIdx].classList.add('rotate-up')
//     }
//     //moving down
//     if (keyCode === 40) {
//       console.log(`player index ${playerIdx}`)
//       pipCount()
//       removePreviousRotation()
//       cells[playerIdx].classList.remove(characterClass)
//       if (cells[playerIdx + width].classList.contains('wall')) {
//         cells[playerIdx].classList.add(characterClass)
//         cells[playerIdx].classList.add('rotate-down')
//         return clearInterval(moving)
//       }
//       playerIdx += width
//       cells[playerIdx].classList.add(characterClass)
//       cells[playerIdx].classList.add('rotate-down')
//     }
//     stageComplete(points)
//   }, 150)
// }
