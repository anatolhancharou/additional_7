module.exports = function solveSudoku(matrix) {
  var zeros = getZeroPositions(matrix);
  
  for (var i = 0; i < zeros.length; i++) {
    var row = zeros[i][0];
    var col = zeros[i][1];
    matrix[row][col] += 1;
    if (matrix[row][col] > 9) {
      matrix[row][col] = 0;
      i -= 2;
      continue;
    }
    if (!isValueUnique(matrix, row, col)) {
      i--;
    }
  }

  return matrix;
}

function getZeroPositions(matrix) {
  var zeroPositions = [];
  
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        zeroPositions.push([i, j]);
      }
    }
  }

  return zeroPositions;
}

function isValueUnique(matrix, row, col) {
  return isValueUniqueInRow(matrix, row, col) &&
  isValueUniqueInColumn(matrix, row, col) &&
  isValueUniqueInBlock(matrix, row, col);
}

function isValueUniqueInRow(matrix, row, col) {
  
  for (var i = 0; i < 9; i++) {
    if (i === col) {
      continue;
    }
    if (matrix[row][i] === matrix[row][col]) {
      return false;
    }
  }

  return true;
}

function isValueUniqueInColumn(matrix, row, col) {
  
  for (var i = 0; i < 9; i++) {
    if (i === row) {
      continue;
    }
    if (matrix[i][col] === matrix[row][col]) {
      return false;
    }
  }

  return true;
}

function isValueUniqueInBlock(matrix, row, col) {
  var blockCornerRow = Math.floor(row / 3) * 3;
  var blockCornerCol = Math.floor(col / 3) * 3;
  
  for (var i = blockCornerRow; i < blockCornerRow + 3; i++) {
    for (var j = blockCornerCol; j < blockCornerCol + 3; j++) {
      if (i === row && j === col) {
        continue;
      }
      if (matrix[i][j] === matrix[row][col]) {
        return false;
      }
    }
  }
  
  return true;
}
