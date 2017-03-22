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

		this.start = function (callback) {
			prepareBoard();
			that.printBoard();
			renderBoard();

			if (callback) {
				callback();
			}
			simulatePlay();
		};

		function prepareBoard() {
			for (var i = 0; i < BOARD_SIZE; i++) {
					board.push(new Array(BOARD_SIZE).fill(0));
				}
		}

		 function renderBoard () {
			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board[0].length; j++) {
					var renderThis = document.createElement('div');
					renderThis.setAttribute('class', 'empty-space animtae');
					renderThis.setAttribute('id', 'pos_' + i + '_' + j);
					renderThis.onclick = function () {
						play(i, j);
					};
					$container.appendChild(renderThis);
				}
			}
		}

		this.play = function (x, y) {
			if (board[x][y] === 0) {
				board[x][y] = starter;
				starter = (starter == 1 ? 2 : 1);
			}

			that.printBoard();
			var hasWinner = that.anyWinner();

			if (hasWinner) {
				that.doWinner();
			}
		};

		this.doWinner = function () {
			console.log('We have a winner ...');
		};

		this.anyWinner = function () {
			var found = false;
			var last;

			for (winState of winStates) {
				if (found) { break; }
				found = checkWinState(winState);
			}
			return found;
		};


		function checkWinState(winState) {
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
