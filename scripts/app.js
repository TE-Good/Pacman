console.log('JS loaded')

window.addEventListener('DOMContentLoaded', () => {

  const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 269, 270, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
  const pipArray = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 48, 51, 58, 61, 68, 71, 78, 81, 88, 91, 98, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 121, 138, 141, 142, 143, 144, 145, 146, 153, 154, 155, 156, 157, 158, 166, 173, 186, 193, 206, 213, 226, 233, 241, 242, 243, 244, 245, 246, 247, 248, 251, 252, 253, 254, 255, 256, 257, 258, 261, 266, 268, 271, 273, 278, 281, 286, 288, 289, 290, 291, 293, 298, 301, 306, 313, 318, 321, 322, 323, 324, 325, 326, 333, 334, 335, 336, 337, 338, 341, 358, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378 ]

  const width = 20
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const cells = []
  // inital character placement (array index)
  let playerIdx = 290
  //intitalising movement setInterval()
  let moving = null
  //points coutner
  let points = 0

  // grid creation
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // wall creation
  cells.forEach((item, index) => {
    const cell = document.createElement('section')
    // item.appendChild(cell).classList.add('inner')
    return wallArray.includes(index) ? item.classList.add('wall') : 0
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


  // KEY EVENT LISTENER
  document.addEventListener('keyup', e => {

    console.log(e.keyCode)
    

    // cells[playerIdx].classList.remove('player')

    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)
    

    switch (e.keyCode) {
      //left
      case 37: 
        if (!cells[playerIdx - 1].classList.contains('wall')) movement(37)
        // if (playerIdx === 180) playerIdx = 199
        // if (cells[playerIdx - 1].classList.contains('wall')) break
        // if (x > 0) playerIdx -= 1
        
        // if (x > 0) {
        // if (initialisation === false) {
        //   initialisation = true
        //   initialisation = movement('left')
        // }
        // if (initialisation === false) {
        //   initialisation = true
        //   initialisation = movement(37)
        // }
        break
      //up
      case 38:
        if (!cells[playerIdx - width].classList.contains('wall')) movement(38)
        // if (cells[playerIdx - 20].classList.contains('wall')) break
        // if (y > 0) playerIdx -= width
        break
      //right
      case 39:
        if (!cells[playerIdx + 1].classList.contains('wall')) movement(39)

        // if (playerIdx === 199) playerIdx = 180 
        // if (cells[playerIdx + 1].classList.contains('wall')) break
        // if ( x < width - 1) playerIdx += 1
        // if ( x < width - 1) movement('right')
        // if (initialisation === false) {
        //   initialisation = true
        //   initialisation = movement(39)
        // }
        break
      //down
      case 40: 
        if (!cells[playerIdx + width].classList.contains('wall')) movement(40)
        // if (cells[playerIdx + 20].classList.contains('wall')) break
        // if (y < width - 1) playerIdx += width
        break
    }

    // cells[playerIdx].classList.add('player')


    




  })

  function movement(keyCode) {

    //clearing previous movement
    clearInterval(moving)
    //loop
    moving = setInterval(() => {
      
    
      // moving left
      if (keyCode === 37) {
        console.log(`player index ${playerIdx}`)
        //removing pips and accumalating points
        pipCount()
        //remove pacman
        cells[playerIdx].classList.remove('player')
        // if a wall ahead
        if (cells[playerIdx - 1].classList.contains('wall')) {
          //add pacman
          cells[playerIdx].classList.add('player')
          // stop loop
          return clearInterval(moving)
        }
        //move pacman left by 1
        playerIdx -= 1
        //if at middle opening, loop to opposite side
        if (playerIdx === 180) playerIdx = 199
        // add pacman
        cells[playerIdx].classList.add('player')
      }

      // moving right
      if (keyCode === 39) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx + 1].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx += 1
        if (playerIdx === 199) playerIdx = 180
        cells[playerIdx].classList.add('player')
      }

      //moving up
      if (keyCode === 38) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx - width].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx -= width
        cells[playerIdx].classList.add('player')
      }
      //moving down
      if (keyCode === 40) {
        console.log(`player index ${playerIdx}`)
        pipCount()
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx + width].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx += width
        cells[playerIdx].classList.add('player')
      }
    }, 150)
    stageComplete()
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

  function stageComplete() {
    if (points === 134) {
      return console.log('STAGE COMPLETE')
    }
  }



  // END OF DOMContentLoaded
})
