

const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 269, 270, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
const pipArray = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 48, 51, 58, 61, 68, 71, 78, 81, 88, 91, 98, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 121, 138, 141, 142, 143, 144, 145, 146, 153, 154, 155, 156, 157, 158, 166, 173, 186, 193, 206, 213, 226, 233, 241, 242, 243, 244, 245, 246, 247, 248, 251, 252, 253, 254, 255, 256, 257, 258, 261, 266, 268, 271, 273, 278, 281, 286, 288, 289, 290, 291, 293, 298, 301, 306, 313, 318, 321, 322, 323, 324, 325, 326, 333, 334, 335, 336, 337, 338, 341, 358, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378 ]
const ghostBanned = [180, 181, 182, 183, 184, 185, 194, 195, 196 , 197, 198, 199]
//grid width
const width = 20
const grid = document.querySelector('.grid')
const score = document.querySelector('.score')
const gameOverTitle = document.querySelector('.game-over')
const stageOneTitle = document.querySelector('.stage-one')
const cells = []
// inital character placement (array index)
let this.playerIdx = 290
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
const speed = 200

//ghost 1 location
let this.ghostIdx = 151

// ghost - up left down or right
let lastPosition = null

//ghostPriorityDirection
let ghostPriorityDirection = null

//backtrack loop
const backTrackLoop = null

//
let lastthis.ghostIdx = 0
//force move function
let forceMoveFunction = null

// preferred direciton
let preferredGhostDirection = null

// unstuck counter
let duplicatethis.ghostIdx = null

//this.target of ghost
let this.target = 0

//10 seconds clear timer for ghost reassignment
let setting10SecondTimer = null

//gameOver Interval timer
let gameOverLoop = null



// console.log(`Ghost X:${ghostX}`, `Y:${ghostY}`)

target = 193
// const targetX = this.target % width
// console.log(targetX)
// const targetY = Math.floor(this.target / width)
// console.log(targetY)
// console.log(`this.target X:${targetX}`, `Y:${targetY}`)
// horizontal or vertical
// let lastAxis = null

class Ghost {
  constructor(ghostIdx, playerIdx, target, cssClass, speed) {
    this.ghostIdx = ghostIdx
    this.playerIdx = playerIdx
    this.target = target
    this.cssClass = cssClass
    this.speed = speed

    this.ghostX = this.ghostIdx % width
    this.ghostY = Math.floor(this.ghostIdx / width)
    this.lastghostIdx = null
  }



  start() {
    this.chasePac(this.ghostIdx, this.playerIdx)
    this.tenSecondReassign()
    ghostOneTargetMove1 = setInterval(() => {
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
              console.log(1, 'right')
              this.ghostRightByOne()
              //if not then if y is a postive number, try down
            } else if (yDifference > 0) {
              console.log(12)
              this.ghostDownByOne()
              // if not then if y is a negative number try right
            } else if (yDifference < 0) {
              console.log(13)
              this.ghostUpByOne()
            } 
          }
          if (xDifference < 0) {
            if (this.ghostWallCheck('left')) {
              console.log(1, 'left')
              this.ghostLeftByOne()
            } else if (yDifference > 0) {
              console.log(22)
              this.ghostDownByOne()
            } else if (yDifference < 0) {
              console.log(23)
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
              console.log(1, 'down')
              this.ghostDownByOne()
              //if not then if x is a postive number, try right
            } else if (xDifference > 0 && this.ghostWallCheck('right')) {
              console.log(12)
              this.ghostRightByOne()
              // if not then if x is a negative number try left
            } else if (xDifference < 0 && this.ghostWallCheck('left')) {
              console.log(13)
              this.ghostLeftByOne()
            }
          }
          // y less than 0
          if (yDifference < 0) {
            // up
            if (this.ghostWallCheck('up')) {
              console.log(1, 'up')
              this.ghostUpByOne()
              // right
            } else if (xDifference > 0 && this.ghostWallCheck('right')) {
              console.log(22)
              this.ghostRightByOne()
              // left
            } else if (xDifference < 0 && this.ghostWallCheck('left')) {
              console.log(23)
              this.ghostLeftByOne()
            }
          }
          break
      }
      // if the ghost is in the same spot for the next loop
      if (lastghostIdx === this.ghostIdx) {
        console.log('chostghost')
        
        if (xDifference === 0 && yDifference === 0) {
          this.closeBox()
          clearInterval(ghostOneTargetMove1)
          console.log('arrived, new this.target')
          this.randomTarget()
          return this.ghostToTargetMovement()
        } else this.forceMove(xDifference, yDifference), console.log('forced')
      }
      lastghostIdx = this.ghostIdx
      
    }, this.speed)
  }
  
  chasePac(ghostIdx, playerIdx) {
    const ghostY = Math.abs(Math.floor(this.ghostIdx / width))
    const ghostX = Math.abs(this.ghostIdx % width)
    const pacY = Math.abs(Math.floor(this.playerIdx / width))
    const pacX = Math.abs(this.playerIdx % width)
    let pacGhostYDifference = null
    let pacGhostXDifference = null
  
    if (ghostY > pacY) {
      pacGhostYDifference = ghostY - pacY
    } else pacGhostYDifference = pacY - ghostY
    if (ghostX > pacX) {
      pacGhostXDifference = ghostX - pacX
    } else pacGhostXDifference = pacX - ghostX
    
    if (pacGhostYDifference <= 5 && pacGhostXDifference <= 5){
      console.log('chasing')
      return this.target = this.playerIdx
    }
  }
  
  tenSecondReassign() {
    clearInterval(setting10SecondTimer)
    setting10SecondTimer = setTimeout(() => {
      clearInterval(ghostOneTargetMove1)
      console.log('Times up, new this.target')
      this.randomTarget()
      return this.ghostToTargetMovement()
    }, 5000)
  }
  
  closeBox() {
    cells[187].classList.add('ghost-banned')
    ghostBanned.push(187)
    cells[192].classList.add('ghost-banned')
    ghostBanned.push(192)
  }
  
  forceMove(xDiff, yDiff) {
    console.log(this.availableDirectionCount())
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
    let random399 = null
    while (!pipArray.includes(random399)){
      random399 = Math.floor(Math.random() * 399)
    }
    this.target = random399
    console.log('this.target moved to', this.target)
    return this.target
  }
    
  
  
  ghostWallCheck(move) {
    switch (move) {
      //left
      case 'left': 
        if (!cells[this.ghostIdx - 1].classList.contains('wall') && !cells[this.ghostIdx - 1].classList.contains('ghost-banned')  && lastPosition !== 'left') return true
        else return false
      //down
      case 'down':
        if (!cells[this.ghostIdx + width].classList.contains('wall') && lastPosition !== 'down') return true
        else return false
      //right
      case 'right':
        if (!cells[this.ghostIdx + 1].classList.contains('wall') && !cells[this.ghostIdx + 1].classList.contains('ghost-banned')  && lastPosition !== 'right') return true
        else return false
      //up
      case 'up':
        if (!cells[this.ghostIdx - width].classList.contains('wall')  && lastPosition !== 'up') return true
        else return false
    }
  }

  availableDirectionCount() {
    let wallCount = 0
    if (this.ghostWallCheck('up')) wallCount++
    if (this.ghostWallCheck('left')) wallCount++
    if (this.ghostWallCheck('down')) wallCount++
    if (this.ghostWallCheck('right')) wallCount++
    
    return wallCount
  }
  
  //direction based upon this.target location
  ghostYDirection(ghostIdx, target){
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
  ghostXDirection(ghostIdx, target){
    const targetX = this.target % width
    //ghostX > targetX
    if ((this.ghostIdx % width) > (this.target % width)) {
      return targetX - (this.ghostIdx % width)
      // targetX > ghostX
    } else if ((this.target % width) > (this.ghostIdx % width)) {
      return targetX - (this.ghostIdx % width)
    } else return 0
  }
  
  // GHOST INDIVIDUAL MOVEMENTS
  ghostUpByOne(clearIntervalFunctionName) {
    this.removePreviousRotation(this.ghostIdx)
    cells[this.ghostIdx].classList.remove(this.cssClass)
    if (cells[this.ghostIdx - width].classList.contains('wall') || lastPosition === 'up') {
      console.log(`ghostOne index ${this.ghostIdx}`)
      cells[this.ghostIdx].classList.add(this.cssClass)
      return clearInterval(clearIntervalFunctionName)
    }
    this.ghostIdx -= width
    lastPosition = 'down'
    cells[this.ghostIdx].classList.add(this.cssClass)
  }
  ghostRightByOne(clearIntervalFunctionName) {
    this.removePreviousRotation(this.ghostIdx)
    cells[this.ghostIdx].classList.remove(this.cssClass)
    if (cells[this.ghostIdx + 1].classList.contains('wall') || cells[this.ghostIdx + 1].classList.contains('ghost-banned') || lastPosition === 'right') {
      console.log(`ghostOne index ${this.ghostIdx}`)
      cells[this.ghostIdx].classList.add(this.cssClass)
      return clearInterval(clearIntervalFunctionName)
    }
    this.ghostIdx += 1
    lastPosition = 'left'
    if (this.ghostIdx === 199) this.ghostIdx = 180
    cells[this.ghostIdx].classList.add(this.cssClass)
  }
  ghostDownByOne(clearIntervalFunctionName) {
    this.removePreviousRotation(this.ghostIdx)
    cells[this.ghostIdx].classList.remove(this.cssClass)
    if (cells[this.ghostIdx + width].classList.contains('wall') || lastPosition === 'down') {
      console.log(`ghostOne index ${this.ghostIdx}`)
      cells[this.ghostIdx].classList.add(this.cssClass)
      return clearInterval(clearIntervalFunctionName)
    }
    this.ghostIdx += width
    lastPosition = 'up'
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
    if (cells[this.ghostIdx - 1].classList.contains('wall') || cells[this.ghostIdx - 1].classList.contains('ghost-banned') || lastPosition === 'left') {
      console.log(`ghostOne index ${this.ghostIdx}`)
      cells[this.ghostIdx].classList.add(this.cssClass)
      return clearInterval(clearIntervalFunctionName)
    }
    this.ghostIdx -= 1
    lastPosition = 'right'
    if (this.ghostIdx === 180) this.ghostIdx = 199
    cells[this.ghostIdx].classList.add(this.cssClass)
  }
  
  
  
  
  
} // END OF CLASS

const ghostTwo = new Ghost(149, playerIdx, 186, 'ghost-two', speed)
ghostTwo.start()




