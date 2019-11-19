var readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

var rows = 10;
var columns = 10;
var numberOfMines = 10;

if (numberOfMines > rows * columns) {
	throw 'not enough space on board for mines';
}

var minesboard = [];
var userboard = [];
var solutionBoard = [];

var resetBoard = () => {

	minesboard = [];
	userboard = [];
	solutionBoard = [];

	for (var c = 0; c < columns; c++) {
		minesboard.push([]);
		userboard.push([]);
		for (var r = 0; r < rows; r++) {
			minesboard[c][r] = 0;
			userboard[c][r] = ' ';
		}
	}

	var minesPlanted = 0;
	while(minesPlanted < numberOfMines) {
		var randomRow = Math.floor(Math.random() * rows);
		var randomColumn = Math.floor(Math.random() * columns);

		if (minesboard[randomColumn][randomRow] === 0) {
			minesboard[randomColumn][randomRow] = 1;
			minesPlanted++;
		}
	}
	//Solution board
	for (var c = 0; c < columns; c++) {
		solutionBoard.push([]);
		for (var r = 0; r < rows; r++) {
			var nearbyMines = 0;

			if (minesboard[c][r] === 1) {
				solutionBoard[c][r] = 'X';
			} else {
				if (c-1 >= 0 && r-1 >= 0) {
					if (minesboard[c-1][r-1] === 1) {
						nearbyMines++;
					}
				}
				if (r-1 >= 0) {
					if (minesboard[c][r-1] === 1) {
						nearbyMines++;
					}
				}
				if (c+1 < columns && r-1 >= 0) {
					if (minesboard[c+1][r-1] === 1) {
						nearbyMines++;
					}
				}
				if (c-1 >= 0) {
					if (minesboard[c-1][r] === 1) {
						nearbyMines++;
					}
				}
				if (c+1 < columns) {
					if (minesboard[c+1][r] === 1) {
						nearbyMines++;
					}
				}
				if (c-1 >= 0 && r+1 < rows) {
					if (minesboard[c-1][r+1] === 1) {
						nearbyMines++;
					}
				}
				if (r+1 < rows) {
					if (minesboard[c][r+1] === 1) {
						nearbyMines++;
					}
				}
				if (c+1 < columns && r+1 < rows) {
					if (minesboard[c+1][r+1] === 1) {
						nearbyMines++;
					}
				}
				solutionBoard[c][r] = nearbyMines;
			}
		}
	}
}

resetBoard();

var printBoard = (board) => {

	var topRow = ' ';
	for (var c = 0; c < columns; c++) {
		topRow += ` ${c} `
	}
	console.log(topRow)

	for (var r = 0; r < rows; r++) {
		var rowString = '' + r;
		for (var c = 0; c < columns; c++) {
			rowString += `[${board[c][r]}]`;
		}
		console.log(rowString);
	}
}

printBoard(userboard);

console.log('enter command:');
readline.on('line', (input) => {
	if (input.includes(',') && input.split(',').length === 2 
			&& !isNaN(input.split(',')[0]) 
			&& !isNaN(input.split(',')[1])
			&& input.split(',')[0] < rows
			&& input.split(',')[1] < columns) {
		var inputRow = input.split(',')[0];
		var inputCol = input.split(',')[1];
		userboard[inputCol][inputRow] = solutionBoard[inputCol][inputRow];

		if (solutionBoard[inputCol][inputRow] != 'X') {
			console.log(inputRow, inputCol)
		} else {
			console.log('BOOOOM YOU LOSE');
			printBoard(userboard)
			console.log('NEW GAME...');
			resetBoard();
		}

	} else if (input === 'reset') {
		console.log('resetting...');
		resetBoard();
	} else {
		console.log('invalid command');
	}
	printBoard(userboard);
	console.log('enter command:');
})