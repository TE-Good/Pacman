console.log('JS loaded')

window.addEventListener('DOMContentLoaded', () => {

  const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 288, 289, 290, 291, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]

  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []
  // inital character placement (array index)
  let playerIdx = 270

  let moving = null

  // grid creation
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  cells.forEach((item, index) => {
    return wallArray.includes(index) ? item.classList.add('wall') : 0
  })

  // initial character placement
  cells[playerIdx].classList.add('player')


  // KEY EVENT LISTENER
  document.addEventListener('keyup', e => {

    changeDirectionInput = e.keyCode

    console.log(e.keyCode)

    // cells[playerIdx].classList.remove('player')

    // const x = playerIdx % width
    // const y = Math.floor(playerIdx / width)

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
    moving = setInterval(() => {
      // moving left
      if (keyCode === 37) {
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx - 1].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx -= 1
        if (playerIdx === 180) playerIdx = 199
        cells[playerIdx].classList.add('player')
      }

      // moving right
      if (keyCode === 39) {
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
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx - width].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx -= width
        cells[playerIdx].classList.add('player')
      }
      //moving up
      if (keyCode === 40) {
        cells[playerIdx].classList.remove('player')
        if (cells[playerIdx + width].classList.contains('wall')) {
          cells[playerIdx].classList.add('player')
          return clearInterval(moving)
        }
        playerIdx += width
        cells[playerIdx].classList.add('player')
      }

    }, 150)
    
  }





  // END OF DOMContentLoaded
})
