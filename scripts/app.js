console.log('JS loaded')

window.addEventListener('DOMContentLoaded', () => {

  const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 269, 270, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
  const pipArray = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 48, 51, 58, 61, 68, 71, 78, 81, 88, 91, 98, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 121, 138, 141, 142, 143, 144, 145, 146, 153, 154, 155, 156, 157, 158, 166, 173, 186, 193, 206, 213, 226, 233, 241, 242, 243, 244, 245, 246, 247, 248, 251, 252, 253, 254, 255, 256, 257, 258, 261, 266, 268, 271, 273, 278, 281, 286, 288, 289, 290, 291, 293, 298, 301, 306, 313, 318, 321, 322, 323, 324, 325, 326, 333, 334, 335, 336, 337, 338, 341, 358, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378 ]
  const powerArray =  [21, 38, 361, 378]
  const ghostBanned = [180, 181, 182, 183, 184, 185, 194, 195, 196 , 197, 198, 199]
  //grid width
  const width = 20
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const startScreenTitle = document.querySelector('.start-screen')
  const gameOverTitle = document.querySelector('.game-over')
  const stageOneTitle = document.querySelector('.stage-one')
  const stageTwoTitle = document.querySelector('.stage-two')
  const stageOneComplete = document.querySelector('.stage-one-complete')
  const gameOverScore = document.querySelector('.game-over-score')
  const stageOneScore = document.querySelector('.stage-one-score')
  const win = document.querySelector('.win')
  const body = document.querySelector('body')
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
  // const speed = 150
  let speed = 100
  let ghostSpeed = speed

  //ghost 1 location
  // const ghostOneIdx = 151

  // ghost - up left down or right
  let lastPosition = null

  //ghostPriorityDirection
  let ghostPriorityDirection = null

  //backtrack loop
  let backTrackLoop = null

  //
  let lastGhostIdx = 0
//force move function
  let forceMoveFunction = null

  // preferred direciton
  let preferredGhostDirection = null

  // unstuck counter
  let duplicateGhostIdx = null

  //target of ghost
  let target = 0

  //10 seconds clear timer for ghost reassignment
  let setting10SecondTimer = null

  //gameOver Interval timer
  let gameOverLoop = null

  //game state
  let gameState = null

  // chasing loop
  // let canIChase = null

  // powerMode
  const powerMode = null
  // powerModeOn
  let powerModeOn = false

  // powerModeTimer
  // let powerModeTimer = null

  // pacman revenger
  let pacmanEat = null

  //power mode duration
  let powerModeDuration = 5000

  //startscreen
  let startScreen = true

  // stage one screen
  let stageOneScreen = false

  

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
  const wall = document.querySelectorAll('.wall')
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
    powerArray.includes(index) ? item.appendChild(cell).classList.add('power') : 0
    return pipArray.includes(index) ? item.appendChild(cell).classList.add('pip') : 0
  })


  // initial character placement
  cells[playerIdx].classList.add('player')
  // initial ghost one placement
  // cells[ghostOneIdx].classList.add('ghost')

  //X Y Player Co-ordinates
  // const x = playerIdx % width
  // const y = Math.floor(playerIdx / width)

  // KEY EVENT LISTENER
  playerMove()
  function playerMove() {
    document.addEventListener('keyup', e => {

      // start screen -> spacebar activation
      if (e.keyCode === 32 && startScreen) {
        startScreen = false
        addGrid()
        startScreenTitle.classList.add('hidden')
        
        setTimeout(() => {
          gameState = true
          ghostOne.start()
          ghostTwo.start()
          ghostThree.start()
          ghostFour.start()
        }, 3000)

      }
      // stage one screen -> spacebar activation
      if (e.keyCode === 32 && stageOneScreen) {
        stageOneScreen = false
        addGrid()
        stageOneComplete.classList.add('hidden')
        stageOneTitle.classList.add('hidden')
        stageTwoTitle.classList.remove('hidden')
        
        setTimeout(() => {
          gameState = true
          ghostOne.start()
          ghostTwo.start()
          ghostThree.start()
          ghostFour.start()
        }, 3000)

      }
      if (gameState === true) {
    
        // console.log(e.keyCode)
        // cells[playerIdx].classList.remove('player')
    
        switch (e.keyCode) {
          //left
          case 37: 
            if (!cells[playerIdx - 1].classList.contains('wall')) movementPlayer(37, 'player')
            break
          case 65: 
            if (!cells[playerIdx - 1].classList.contains('wall')) movementPlayer(37, 'player')
            break
          //up
          case 38:
            if (!cells[playerIdx - width].classList.contains('wall')) movementPlayer(38, 'player')
            break
          case 87:
            if (!cells[playerIdx - width].classList.contains('wall')) movementPlayer(38, 'player')
            break
          //right
          case 39:
            if (!cells[playerIdx + 1].classList.contains('wall')) movementPlayer(39, 'player')
            break
          case 68:
            if (!cells[playerIdx + 1].classList.contains('wall')) movementPlayer(39, 'player')
            break
          //down
          case 40: 
            if (!cells[playerIdx + width].classList.contains('wall')) movementPlayer(40, 'player')
            break
          case 83: 
            if (!cells[playerIdx + width].classList.contains('wall')) movementPlayer(40, 'player')
            break
        }
        // cells[playerIdx].classList.add('player')
      }
    }) //END OF EVENT LISTENER
  }

  function movementPlayer(keyCode, characterClass) {
    // gameOver(playerIdx, ghostOneIdx)

    //clearing previous movement
    clearInterval(playerMoving)
    //loop
    playerMoving = setInterval(() => {
      
    
      // moving left
      if (keyCode === 37) {
        // console.log(`player index ${playerIdx}`)
        //removing pips & power and accumalating points
        pipCount()
        powerCount()
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
        // console.log(`player index ${playerIdx}`)
        pipCount()
        powerCount()
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
        // console.log(`player index ${playerIdx}`)
        pipCount()
        powerCount()
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
        // console.log(`player index ${playerIdx}`)
        pipCount()
        powerCount()
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
  // searching for game over
  gameOverLooper()
  function gameOverLooper() {
    gameOverLoop = setInterval(() => {
      if (ghostOne.ghostIdx === playerIdx || ghostTwo.ghostIdx === playerIdx || 
        ghostThree.ghostIdx === playerIdx || ghostFour.ghostIdx === playerIdx) {
        //state to stop game
        gameState = false
        clearInterval(playerMoving)
        clearInterval(gameOverLoop)
        ghostOne.stop()
        ghostTwo.stop()
        ghostThree.stop()
        ghostFour.stop()
        // clearInterval(ghostOne.ghostOneTargetMove1)
        // clearInterval(ghostOne.setting10SecondTimer)
        // clearInterval(ghostTwo.ghostOneTargetMove1)
        // clearInterval(ghostTwo.setting10SecondTimer)
        // clearInterval(ghostThree.ghostOneTargetMove1)
        // clearInterval(ghostThree.setting10SecondTimer)
        // clearInterval(ghostFour.ghostOneTargetMove1)
        // clearInterval(ghostFour.setting10SecondTimer)
        //delaying putting the game over screen on
        setTimeout(() => {
          removeGrid()
          gameOverScore.innerHTML = points
          gameOverTitle.classList.remove('hidden')
          return true
        }, 500)
      }
    }, 1)
  }

  function addGrid() {
    grid.classList.remove('hidden')
    stageOneTitle.classList.remove('hidden')
    score.classList.remove('hidden')
  }
  function removeGrid() {
    grid.classList.add('hidden')
    if (!stageOneTitle.classList.contains('hidden'))stageOneTitle.classList.add('hidden')
    if (!stageTwoTitle.classList.contains('hidden'))stageTwoTitle.classList.add('hidden')
    score.classList.add('hidden')
  }
  

  function pipCount() {
    // if the cell has a child
    if (cells[playerIdx].children[1]){
      // if that child contains pip
      if (cells[playerIdx].children[1].classList.contains('pip')) {
        //increment a point
        points += 10
        // update the score
        score.innerHTML = `Score:${points}`
        // console.log(`You have ${points} points!`)
        return cells[playerIdx].children[1].classList.remove('pip')
      }
    } else return 0
    // } else return console.log('false')
    // return cells[playerIdx].classList.remove('.pip')
  }

  function powerCount() {
    if (cells[playerIdx].children[1]){
      if (cells[playerIdx].children[1].classList.contains('power')) {
        // powerModeOn = false
        clearInterval(gameOverLoop)
        points += 40

        // changing colours
        body.classList.add('body-inverse')
        wall.forEach(item => {
          item.style.background = 'grey'
          item.style.border = 'grey'
        })

        //halving the speed
        ghostSpeed = speed / 5
        console.log(ghostSpeed)

        cells[ghostOne.ghostIdx].classList.remove(ghostOne.cssClass)
        cells[ghostTwo.ghostIdx].classList.remove(ghostTwo.cssClass)
        cells[ghostThree.ghostIdx].classList.remove(ghostThree.cssClass)
        cells[ghostFour.ghostIdx].classList.remove(ghostFour.cssClass)
        ghostOne.cssClass = 'ghost-scared'
        ghostTwo.cssClass = 'ghost-scared'
        ghostThree.cssClass = 'ghost-scared'
        ghostFour.cssClass = 'ghost-scared'
        clearInterval(pacmanEat)
        pacmanEat = setInterval(() => {
          if (ghostOne.ghostIdx === playerIdx) {
            // clearInterval(ghostOne.ghostOneTargetMove1)
            cells[ghostOne.ghostIdx].classList.remove(ghostOne.cssClass)
            clearInterval(ghostOne.setting10SecondTimer)
            ghostOne.ghostIdx = 150
            ghostOne.target = 193
          }
          if (ghostTwo.ghostIdx === playerIdx) {
            // clearInterval(ghostTwo.ghostOneTargetMove1)
            cells[ghostTwo.ghostIdx].classList.remove(ghostTwo.cssClass)
            clearInterval(ghostTwo.setting10SecondTimer)
            ghostTwo.ghostIdx = 148
            ghostTwo.target = 186
          }
          if (ghostThree.ghostIdx === playerIdx) {
            // clearInterval(ghostThree.ghostOneTargetMove1)
            cells[ghostThree.ghostIdx].classList.remove(ghostThree.cssClass)
            clearInterval(ghostThree.setting10SecondTimer)
            ghostThree.ghostIdx = 148
            ghostThree.target = 186
          }
          if (ghostFour.ghostIdx === playerIdx) {
            // clearInterval(ghostFour.ghostOneTargetMove1)
            cells[ghostFour.ghostIdx].classList.remove(ghostFour.cssClass)
            clearInterval(ghostFour.setting10SecondTimer)
            ghostFour.ghostIdx = 148
            ghostFour.target = 186
          }
        }, 1)
        // power mode timer 
        if (powerModeOn === false){
          powerModeOn = true
          // powerModeTimer = setTimeout(() => {
          // might make an end method for my ghost class instead of these lines
          setTimeout(() => {
            cells[ghostOne.ghostIdx].classList.remove(ghostOne.cssClass)
            cells[ghostTwo.ghostIdx].classList.remove(ghostTwo.cssClass)
            cells[ghostThree.ghostIdx].classList.remove(ghostThree.cssClass)
            cells[ghostFour.ghostIdx].classList.remove(ghostFour.cssClass)
            ghostOne.cssClass = ghostOne.originalCssClass
            ghostTwo.cssClass = ghostTwo.originalCssClass
            ghostThree.cssClass = ghostThree.originalCssClass
            ghostFour.cssClass = ghostFour.originalCssClass
  
            // reverting speed
            ghostSpeed = speed

            //changing background colors
            body.classList.remove('body-inverse')
            wall.forEach(item => {
              item.style.background = ''
              item.style.border = ''
            })
            //at the end of the mode make the pacmanEat turn off and make the gameOver restart
            clearInterval(pacmanEat)
            gameOverLooper()
            powerModeOn = false
          }, powerModeDuration)
          
        } else {
          powerModeDuration += 5000
        }
        // console.log(powerMode)
        score.innerHTML = `Score:${points}`
        // console.log(`You have ${points} points!`)
        return cells[playerIdx].children[1].classList.remove('power')
      }
    } else return 0
    // } else return console.log('false')
    // return cells[playerIdx].classList.remove('.pip')
  }

  function stageComplete(points) {
    if (points === 1500) {
      removeGrid()
      console.log('STAGE COMPLETE')
      stageOneComplete.classList.remove('hidden')

      gameState = false
      clearInterval(playerMoving)
      clearInterval(gameOverLoop)
      ghostOne.stop()
      ghostOne.reset()
      ghostTwo.stop()
      ghostTwo.reset()
      ghostThree.stop()
      ghostThree.reset()
      ghostFour.stop()
      ghostFour.reset()


      // repopulating pip creation
      cells.forEach((item, index) => {
        const cell = document.createElement('section')
        powerArray.includes(index) ? item.appendChild(cell).classList.add('power') : 0
        return pipArray.includes(index) ? item.appendChild(cell).classList.add('pip') : 0
      })

      clearInterval(pacmanEat)
      gameOverLooper()
      stageOneScore.innerHTML = 1500

      stageOneScreen = true
    }
    if (points === 3000) {
      removeGrid()
      gameState = false
      win.classList.remove('hidden')
      clearInterval(playerMoving)
      clearInterval(gameOverLoop)
      ghostOne.stop()
      ghostOne.reset()
      ghostTwo.stop()
      ghostTwo.reset()
      ghostThree.stop()
      ghostThree.reset()
      ghostFour.stop()
      ghostFour.reset()
    }
  }

  function removePreviousRotation(charIdx) {
    cells[charIdx].classList.remove('rotate-right')
    cells[charIdx].classList.remove('rotate-down')
    cells[charIdx].classList.remove('rotate-left')
    cells[charIdx].classList.remove('rotate-up')
  }

  // ***********************
  // ***********************
  // GHOST CLASS CONSTRUCTOR
  // ***********************
  // ***********************

  class Ghost {
    constructor(ghostIdx, target, cssClass, speed) {
      this.ghostIdx = ghostIdx
      this.ghostIdxStored = ghostIdx
      this.target = target
      this.targetStored = target
      this.cssClass = cssClass
      this.speed = speed
  
      this.ghostX = this.ghostIdx % width
      this.ghostY = Math.floor(this.ghostIdx / width)
      this.pacY = Math.abs(Math.floor(playerIdx / width))
      this.pacX = Math.abs(playerIdx % width)
      this.pacGhostYDifference = null
      this.pacGhostXDifference = null
      this.lastghostIdx = null
      this.ghostOneTargetMove1 = null
      this.setting10SecondTimer = null
      this.lastPosition = null
      this.wallCount = null
      this.random399 = null
      this.originalCssClass = this.cssClass
      this.chasing = null
    }
    initalPlacement() {
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
  
  
    // Main ghost movement function
    start() {
      clearInterval(this.ghostOneTargetMove1)
      this.chasePac(this.ghostIdx, playerIdx)
      this.tenSecondReassign()
      this.ghostOneTargetMove1 = setInterval(() => {
        // this.powerMode()
        const xDifference = this.ghostXDirection(this.ghostIdx, this.target)
        const yDifference = this.ghostYDirection(this.ghostIdx, this.target)

        switch (Math.abs(xDifference) > Math.abs(yDifference)) {
          //if x if a minus number - will need to add
          // if x greater than y (therefore do X axis first)
          case true:
            // is x greater than 0
            if (xDifference > 0) {
              // if so check if I can go down
              if (this.ghostWallCheck('right')) {
                // console.log(1, 'right')
                this.ghostRightByOne()
                //if not then if y is a postive number, try down
              } else if (yDifference > 0) {
                // console.log(12)
                this.ghostDownByOne()
                // if not then if y is a negative number try right
              } else if (yDifference < 0) {
                // console.log(13)
                this.ghostUpByOne()
              } 
            }
            if (xDifference < 0) {
              if (this.ghostWallCheck('left')) {
                // console.log(1, 'left')
                this.ghostLeftByOne()
              } else if (yDifference > 0) {
                // console.log(22)
                this.ghostDownByOne()
              } else if (yDifference < 0) {
                // console.log(23)
                this.ghostUpByOne()
              }
            }
            break
          // y is greater than x (therefore do Y axis first)
          case false:
            // is y greater than 0
            if (yDifference > 0) {
              // if so check if I can go down
              if (this.ghostWallCheck('down')) {
                // console.log(1, 'down')
                this.ghostDownByOne()
                //if not then if x is a postive number, try right
              } else if (xDifference > 0 && this.ghostWallCheck('right')) {
                // console.log(12)
                this.ghostRightByOne()
                // if not then if x is a negative number try left
              } else if (xDifference < 0 && this.ghostWallCheck('left')) {
                // console.log(13)
                this.ghostLeftByOne()
              }
            }
            // y less than 0
            if (yDifference < 0) {
              // up
              if (this.ghostWallCheck('up')) {
                // console.log(1, 'up')
                this.ghostUpByOne()
                // right
              } else if (xDifference > 0 && this.ghostWallCheck('right')) {
                // console.log(22)
                this.ghostRightByOne()
                // left
              } else if (xDifference < 0 && this.ghostWallCheck('left')) {
                // console.log(23)
                this.ghostLeftByOne()
              }
            }
            break
        }
        // if the ghost is in the same spot for the next loop
        if (this.lastghostIdx === this.ghostIdx) {
          // console.log('chostghost')
          // if (this.gameOver()) return clearInterval(this.gameOver()), 0
          // else 
          if (xDifference === 0 && yDifference === 0) {
            // console.log('arrived, new target')
            clearInterval(this.ghostOneTargetMove1)
            this.randomTarget()
            return this.start()
          } else this.forceMove(xDifference, yDifference)
        }
        this.lastghostIdx = this.ghostIdx
      }, speed)
    }
    
    chasePac() {
      if (!powerMode) {
        // const ghostY = Math.abs(Math.floor(this.ghostIdx / width))
        // const ghostX = Math.abs(this.ghostIdx % width)
        // const pacY = Math.abs(Math.floor(playerIdx / width))
        // const pacX = Math.abs(playerIdx % width)
        // let pacGhostYDifference = null
        // let pacGhostXDifference = null
      
        if (this.ghostY > this.pacY) {
          this.pacGhostYDifference = this.ghostY - this.pacY
        } else this.pacGhostYDifference = this.pacY - this.ghostY
        if (this.ghostX > this.pacX) {
          this.pacGhostXDifference = this.ghostX - this.pacX
        } else this.pacGhostXDifference = this.pacX - this.ghostX
        if (this.pacGhostYDifference <= 1 || this.pacGhostXDifference <= 1){
          console.log('chasing')
          this.chasing = true
          return this.target = playerIdx
        }
      } else if (powerMode === true && this.chasing === true){
        this.chasing = false
        // console.log('chase stopped')
        clearInterval(this.setting10SecondTimer)
        this.randomTarget()
        return this.start()
      } else {
        this.chase = false
        return 0
      }
    }
    
    tenSecondReassign() {
      clearInterval(this.setting10SecondTimer)
      this.setting10SecondTimer = setTimeout(() => {
        // clearInterval(this.ghostOneTargetMove1)
        // console.log('Times up, new target')
        this.randomTarget()
        return this.start()
      }, 5000)
    }
    
    
    forceMove(xDiff, yDiff) {
      // console.log(this.availableDirectionCount())
      if (this.availableDirectionCount() === 1) {
        if (!this.ghostWallCheck('up') && !this.ghostWallCheck('right') && !this.ghostWallCheck('left')){
          // console.log('f11')
          this.ghostDownByOne()
        } else if (!this.ghostWallCheck('up') && !this.ghostWallCheck('down') && !this.ghostWallCheck('right')){
          // console.log('f12')
          this.ghostLeftByOne()
        } else if (!this.ghostWallCheck('up') && !this.ghostWallCheck('left') && !this.ghostWallCheck('down')){
          // console.log('f13')
          this.ghostRightByOne()
        } else if (!this.ghostWallCheck('right') && !this.ghostWallCheck('left') && !this.ghostWallCheck('down')){
          // console.log('f14')
          this.ghostUpByOne()
        }
      } else if (this.availableDirectionCount() === 2) {
        if (xDiff === 0) {
          // console.log('f21')
          if (this.ghostWallCheck('left')) this.ghostLeftByOne()
          else if (this.ghostWallCheck('right')) this.ghostRightByOne()
        } else if (Math.abs(yDiff) > Math.abs(xDiff)) {
          if (yDiff < 0) this.ghostUpByOne()
          if (yDiff > 0) this.ghostDownByOne()
        }
        if (yDiff === 0) {
          // console.log('f22')
          if (this.ghostWallCheck('up')) this.ghostUpByOne()
          else if (this.ghostWallCheck('right')) this.ghostDownByOne()
        } else if (Math.abs(yDiff) > Math.abs(xDiff)) {
          if (yDiff < 0) this.ghostLeftByOne()
          if (yDiff > 0) this.ghostRightByOne()
        }
        if (xDiff === yDiff) {
          // console.log('f23')
          const random2 = Math.ceil(Math.random() * 2)
          if (random2 === 1) this.ghostUpByOne(), this.ghostDownByOne()
          else this.ghostRightByOne(), this.ghostLeftByOne()
        }
      } else if (this.availableDirectionCount() === 3) {
        // console.log('f33')
        const random3 = Math.ceil(Math.random() * 2)
        if (random3 === 1 && this.ghostWallCheck('up')) this.ghostUpByOne()
        if (random3 === 1 && this.ghostWallCheck('down')) this.ghostDownByOne()
        if (random3 === 2 && this.ghostWallCheck('right')) this.ghostRightByOne()
        if (random3 === 2 && this.ghostWallCheck('left')) this.ghostLeftByOne()
    
      }
    }
    
    
    
    
    // randomTarget()
    randomTarget() {
      this.random399 = null
      while (!pipArray.includes(this.random399)){
        this.random399 = Math.floor(Math.random() * 399)
      }
      this.target = this.random399
      // console.log('target moved to', this.target)
      return this.target
    }
    
    ghostWallCheck(move) {
      switch (move) {
        //left
        case 'left': 
          if (!cells[this.ghostIdx - 1].classList.contains('wall') && !cells[this.ghostIdx - 1].classList.contains('ghost-banned')  && this.lastPosition !== 'left') return true
          else return false
        //down
        case 'down':
          if (!cells[this.ghostIdx + width].classList.contains('wall') && this.lastPosition !== 'down') return true
          else return false
        //right
        case 'right':
          if (!cells[this.ghostIdx + 1].classList.contains('wall') && !cells[this.ghostIdx + 1].classList.contains('ghost-banned')  && this.lastPosition !== 'right') return true
          else return false
        //up
        case 'up':
          if (!cells[this.ghostIdx - width].classList.contains('wall')  && this.lastPosition !== 'up') return true
          else return false
      }
    }
  
    availableDirectionCount() {
      this.wallCount = 0
      if (this.ghostWallCheck('up')) this.wallCount++
      if (this.ghostWallCheck('left')) this.wallCount++
      if (this.ghostWallCheck('down')) this.wallCount++
      if (this.ghostWallCheck('right')) this.wallCount++
      
      return this.wallCount
    }
    
    //direction based upon this.target location
    ghostYDirection(){
      const targetY = Math.floor(this.target / width)
      //GhostY > targetY ?
      if (Math.floor(this.ghostIdx / width) > Math.floor(this.target / width)) {
        return targetY - Math.floor(this.ghostIdx / width)
        // ghostY < targetY ?
      } else if (Math.floor(this.ghostIdx / width) < Math.floor(this.target / width)) {
        return targetY - Math.floor(this.ghostIdx / width)
      } else return 0
    }
    //direction based upon this.target location
    ghostXDirection(){
      const targetX = this.target % width
      //ghostX > targetX
      if ((this.ghostIdx % width) > (this.target % width)) {
        return targetX - (this.ghostIdx % width)
        // targetX > ghostX
      } else if ((this.target % width) > (this.ghostIdx % width)) {
        return targetX - (this.ghostIdx % width)
      } else return 0
    }

    stop() {

      clearInterval(this.ghostOneTargetMove1)
      clearInterval(this.setting10SecondTimer)
    }

    reset() {
      cells[this.ghostIdx].classList.remove(this.cssClass)
      this.ghostIdx = this.ghostIdxStored
      this.target = this.targetStored
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
    
    // GHOST INDIVIDUAL MOVEMENTS
    ghostUpByOne(clearIntervalFunctionName) {
      this.removePreviousRotation(this.ghostIdx)
      cells[this.ghostIdx].classList.remove(this.cssClass)
      if (cells[this.ghostIdx - width].classList.contains('wall') || this.lastPosition === 'up') {
        // console.log(`ghostOne index ${this.ghostIdx}`)
        cells[this.ghostIdx].classList.add(this.cssClass)
        return clearInterval(clearIntervalFunctionName)
      }
      this.ghostIdx -= width
      this.lastPosition = 'down'
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
    ghostRightByOne(clearIntervalFunctionName) {
      this.removePreviousRotation(this.ghostIdx)
      cells[this.ghostIdx].classList.remove(this.cssClass)
      if (cells[this.ghostIdx + 1].classList.contains('wall') || cells[this.ghostIdx + 1].classList.contains('ghost-banned') || this.lastPosition === 'right') {
        // console.log(`ghostOne index ${this.ghostIdx}`)
        cells[this.ghostIdx].classList.add(this.cssClass)
        return clearInterval(clearIntervalFunctionName)
      }
      this.ghostIdx += 1
      this.lastPosition = 'left'
      if (this.ghostIdx === 199) this.ghostIdx = 180
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
    ghostDownByOne(clearIntervalFunctionName) {
      this.removePreviousRotation(this.ghostIdx)
      cells[this.ghostIdx].classList.remove(this.cssClass)
      if (cells[this.ghostIdx + width].classList.contains('wall') || this.lastPosition === 'down') {
        // console.log(`ghostOne index ${this.ghostIdx}`)
        cells[this.ghostIdx].classList.add(this.cssClass)
        return clearInterval(clearIntervalFunctionName)
      }
      this.ghostIdx += width
      this.lastPosition = 'up'
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
    removePreviousRotation(charIdx) {
      cells[charIdx].classList.remove('rotate-right')
      cells[charIdx].classList.remove('rotate-down')
      cells[charIdx].classList.remove('rotate-left')
      cells[charIdx].classList.remove('rotate-up')
    }
    ghostLeftByOne(clearIntervalFunctionName) {
      this.removePreviousRotation(this.ghostIdx)
      cells[this.ghostIdx].classList.remove(this.cssClass)
      if (cells[this.ghostIdx - 1].classList.contains('wall') || cells[this.ghostIdx - 1].classList.contains('ghost-banned') || this.lastPosition === 'left') {
        // console.log(`ghostOne index ${this.ghostIdx}`)
        cells[this.ghostIdx].classList.add(this.cssClass)
        return clearInterval(clearIntervalFunctionName)
      }
      this.ghostIdx -= 1
      this.lastPosition = 'right'
      if (this.ghostIdx === 180) this.ghostIdx = 199
      cells[this.ghostIdx].classList.add(this.cssClass)
    }
    
  } // END OF CLASS
  
  const ghostOne = new Ghost(150, 193, 'ghost-one', ghostSpeed)
  const ghostTwo = new Ghost(149, 186, 'ghost-two', ghostSpeed)
  const ghostThree = new Ghost(211, 193, 'ghost-three', ghostSpeed)
  const ghostFour = new Ghost(208,  186, 'ghost-four', ghostSpeed)
  ghostOne.initalPlacement()
  ghostTwo.initalPlacement()
  ghostThree.initalPlacement()
  ghostFour.initalPlacement()
  // ghostOne.start()
  // ghostTwo.start()
  // ghostThree.start()
  // ghostFour.start()

  
  

  

}) // END OF DOMContentLoaded