(function () {
	function TicTacToe($container) {
		var that = this;
		var BOARD_SIZE = 3;
		var board = [];

		var winStates = [
			[[0, 0], [0, 1], [0, 2]],
			[[1, 0], [1, 1], [1, 2]],
			[[2, 0], [2, 1], [2, 2]],

			[[0, 0], [1, 0], [2, 0]],
			[[0, 1], [1, 1], [2, 1]],
			[[0, 0], [1, 0], [2, 0]],

			[[0, 0], [1, 1], [2, 2]],
			[[0, 2], [1, 1], [2, 0]]
		];

		starter = 1;

		this.prepareBoard = function () {
			for (var i = 0; i < BOARD_SIZE; i++) {
					board.push(new Array(BOARD_SIZE).fill(0));
				}
		};

		this.renderBoard = function () {
			var i = 0;
			for (row of board) {
				var j = 0;
				var column = document.createElement('div');
				column.setAttribute('class', 'table-row');
				for (cell of row) {
					var cell = document.createElement('div');
					cell.setAttribute('class', 'div-table-col');
					cell.setAttribute('id', 'pos_' + i + '_' + j);
					cell.onclick = function () {
						var getXY = this.id.split('_');
						that.play(parseInt(getXY[1], 10), parseInt(getXY[2], 10));
					};
					column.appendChild(cell);
					j++;
				}
				$container.appendChild(column);
				i++;
			}
		};

		this.play = function (x, y) {
			if (board[x][y] === 0) {
				board[x][y] = starter;
				starter = (starter == 1 ? 2 : 1);
				that.printBoard();
				that.renderMove(x, y, starter);
				var hasWinner = that.anyWinner();

				if (hasWinner) {
					that.doWinner();
				}
			}
		};

		this.renderMove = function (x, y, sign) {
			var cell = document.querySelector('#pos_' + x + '_' + y);
			var innerSpan = document.createElement('span');
			innerSpan.setAttribute('style', 'line-height: 85px');
			innerSpan.textContent = (sign == 1 ? 'X' : 'O');
			cell.appendChild(innerSpan);
		};

		this.doWinner = function () {
			console.log('We have a winner ...');
		};

		this.anyWinner = function () {
			var found = false;
			var last;

			for (winState of winStates) {
				if (found) { break; }
				found = that.checkWinState(winState);
			}
			return found;
		};


		this.checkWinState = function (winState) {
			var last;

			for (position of winState) {
				if (!last) {
					if (board[position[0]][position[1]] > 0) {
						last = board[position[0]][position[1]];
						continue;
					} else {
						return false;
					}
				} else {
					if (last !== (board[position[0]][position[1]])) {
						return false;
					}
				}
			}

			return true;
		}

		this.printBoard = function () {
			var result = '';

			for (var row of board) {
				for (var cell of row) {
					result += cell;
				}
				result += '\n';
			}

			console.log (result);
		};

		this.start = function (callback) {
			that.prepareBoard();
			that.printBoard();
			that.renderBoard();

			if (callback) {
				callback();
			}
			//simulatePlay();
		};
	}

	var $container = document.querySelector('.game-board');
	var ticTacToe = new TicTacToe($container);

	var $button = document.querySelector('.btn');
	$button.onclick = function () {
		ticTacToe.start();
	};

	function simulatePlay () {
		ticTacToe.play(0, 0);
		ticTacToe.play(1, 1);
		ticTacToe.play(0, 2);
		ticTacToe.play(2, 1);
		ticTacToe.play(0, 1);
	}

}());
