// generating squares
function generateHTMLForBoardSquares() {
  const numberOfSquares = 16;
  let squaresHTML = "";

  //html
  for (let i = 0; i < numberOfSquares; i++) {
    squaresHTML +=
      '<div class="col-3 board-square ">\n' +
      '<div class="square-container">\n' +
      '<div class="down-square"></div>\n' +
      '<div class="up-square"></div>\n' +
      "</div>\n" +
      "</div>\n";
  }
  const boardElement = document.getElementById("gameboard");
  boardElement.innerHTML = squaresHTML;
}
generateHTMLForBoardSquares();

//===============================================================================

let firstUpSquare = null;
function squareFlipped(square) {
  if (firstUpSquare === null) {
    firstUpSquare = square;
    return;
  }
  if (firstUpSquare.color === square.color) {
    firstUpSquare.matchFound();
    square.matchFound();

    firstUpSquare = null;
  } else {
    const a = firstUpSquare;
    const b = square;
    firstUpSquare = null;

    setTimeout(function () {
      a.reset();
      b.reset();
    }, 500);
  }
}
// ============================================================================
// add colors
class BoardSquare {
  constructor(element, color) {
    this.element = element;
    // add click event
    this.element.addEventListener("click", this, false);
    this.isSquareUp = false;
    this.isMatched = false;
    this.setColor(color);
  }
  setColor(color) {
    const squareUpElement = this.element.getElementsByClassName("up-square")[0];
    squareUpElement.classList.remove(this.color);
    this.color = color;
    squareUpElement.classList.add(color);
  }

  reset() {
    this.isSquareUp = false;
    this.isMatched = false;
    this.element.classList.remove("flipped");
  }

  matchFound() {
    this.isSquareUp = true;
    this.isMatched = true;
  }
  handleEvent(event) {
    switch (event.type) {
      case "click":
        // print to the console that square is clicked
        console.log(this.color + " square was clicked");

        if (this.isSquareUp || this.isMatched) {
          return;
        }
        this.isSquareUp = true;
        this.element.classList.add("flipped");
        squareFlipped(this);
    }
  }
}

// random colors

const colorsPairs = [];

function generateColorPairs() {
  if (colorsPairs.length > 0) {
    return colorsPairs;
  } else {
    for (let i = 0; i < 8; i++) {
      colorsPairs.push("color-" + i);
      colorsPairs.push("color-" + i);
    }
    return colorsPairs;
  }
}

// ======================================================================================
// shuffle array

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;

  while (0 !== currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function shuffleColors() {
  const colorsPairs = generateColorPairs();
  return shuffle(colorsPairs);
}

// ============================================================================
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  console.log("reset button click");
  resetGame();
});
// ============================================================================
function resetGame() {
  firstUpSquare = null;
  boardSquares.forEach((square) => {
    square.reset();
  });

  setTimeout(() => {
    const randomColorPairs = shuffleColors();

    for (let i = 0; i < boardSquares.length; i++) {
      const newColor = randomColorPairs[i];
      const square = (board = boardSquares[i]);

      square.setColor(newColor);
    }
  }, 500);
}

//==================================================================================
const boardSquares = [];
function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();

  const squareElements = document.getElementsByClassName("board-square");

  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];

    const square = new BoardSquare(element, color);

    boardSquares.push(square);
  }
}
// function setupGame() {
//   generateHTMLForBoardSquares();
//     const randomColorPairs = shuffleColors();
// }
setupGame();
