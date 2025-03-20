document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("sudokuBoard");
  const board = [];
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("cell");

    input.addEventListener("input", (e) => {
      if (!/^[1-9]?$/.test(e.target.value)) {
        e.target.value = "";
      }
    });

    boardElement.appendChild(input);
  }

  const cells = document.querySelectorAll(".cell");
  function clearHandle() {
    cells.forEach((element) => {
      element.value = "";
    });
  }

  document.getElementById("clearBtn").addEventListener("click", clearHandle);

  // Step 2: Convert inputs into a 2D board
  function getBoard() {
    board.length = 0;
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let index = i * 9 + j;
        row.push(cells[index].value || "0");
      }
      board.push(row);
    }
    return board;
  }

  // Step 3: Find the first empty cell
  function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "0") {
          return { row, col };
        }
      }
    }
    return null; // No empty cell found
  }

  // Step 4: Check if a number is valid in a cell
  function isValid(board, num, row, col) {
    // Check Row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }

    // Check Column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // Check 3x3 Box
    let boxRowStart = Math.floor(row / 3) * 3;
    let boxColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRowStart + i][boxColStart + j] === num) return false;
      }
    }

    return true; // Number is valid
  }

  // Step 5: Solve Sudoku using Backtracking
  function solveSudoku(board) {
    let empty = findEmptyCell(board);
    if (!empty) return true; // No empty cells left, puzzle is solved

    let { row, col } = empty;

    for (let num = 1; num <= 9; num++) {
      let strNum = num.toString();
      if (isValid(board, strNum, row, col)) {
        board[row][col] = strNum; // Place number

        if (solveSudoku(board)) return true; // Move to next empty cell

        board[row][col] = "0"; // Reset cell (backtrack)
      }
    }

    window.alert("This Is A Error YOU HAVE CRASHED THE SITE.");
    return false; // No solution found
  }

  // Step 6: Display the solved Sudoku in the UI
  function updateBoardUI(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let index = i * 9 + j;
        cells[index].value = board[i][j] !== "0" ? board[i][j] : "";
      }
    }
  }

  // Step 7: Solve and Display Solution
  function handleSolve() {
    let boardData = getBoard();
    if (solveSudoku(boardData)) {
      updateBoardUI(boardData);
      console.log("Sudoku Solved:", boardData);
    } else {
      console.log("No solution exists");
    }
  }
  document.getElementById("solveBtn").addEventListener("click", handleSolve);


const input = document.querySelector("input");

input.addEventListener("input", () => {
  if (input.value.trim() !== "") {
    input.classList.add("has-value");
  } else {
    input.classList.remove("has-value");
  }
});

});