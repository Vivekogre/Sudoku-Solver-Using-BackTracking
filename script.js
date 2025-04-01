var arr = Array.from({ length: 9 }, () => Array(9));

window.onload = function () {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j] = document.getElementById(i * 9 + j);
        }
    }
};

var board = Array.from({ length: 9 }, () => Array(9).fill(0));

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    generateSudoku();
    FillBoard(board);
};

SolvePuzzle.onclick = () => {
    setTimeout(() => {
        SudokuSolver(board, 0, 0, 9);
    }, 0);
};

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] == num || board[x][col] == num) {
            return false;
        }
    }
    
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

function SudokuSolver(board, row, col, n) {
    if (row == n) {
        FillBoard(board);
        return true;
    }
    
    if (col == n) {
        return SudokuSolver(board, row + 1, 0, n);
    }
    
    if (board[row][col] != 0) {
        return SudokuSolver(board, row, col + 1, n);
    }
    
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (SudokuSolver(board, row, col + 1, n)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

function generateSudoku() {
    board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillDiagonalBoxes();
    SudokuSolver(board, 0, 0, 9);
    removeNumbers(30); // Adjust difficulty by changing the number of removals
}

function fillDiagonalBoxes() {
    for (let i = 0; i < 9; i += 3) {
        fillBox(i, i);
    }
}

function fillBox(row, col) {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    let k = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[row + i][col + j] = nums[k++];
        }
    }
}

function removeNumbers(count) {
    while (count > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] != 0) {
            board[row][col] = 0;
            count--;
        }
    }
}