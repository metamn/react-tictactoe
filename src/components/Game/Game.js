import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Board from './../Board';
import History from './../History';

/**
 * The container style
 */
const Container = styled.section`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

/**
 * The columns
 */
const Col1 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1.25em;
`;

const Col2 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1.25em;
`;

/**
 * The container title style
 */
const ContainerTitle = styled.h1``;

/**
 * The status bar style
 */
const StatusBar = styled.aside``;

/**
 * The status bar title style
 */
const StatusBarText = styled.h3``;

/**
 * The restart button style.
 */
const RestartButton = styled.button`
	margin: 1.25em 0;
	padding: .625em;
	cursor: pointer;
	background: white;
	border: 1px solid;
`;



/**
 * Defines which lines are a winning combination.
 */
const winningLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];


/**
 * Checks if there is a winner.
 *
 * @param  {array}  squares The squares.
 * @return {object}         The ID of the winner, and the winning line
 */
function hasWinner(squares) {
	for (let i = 0; i < winningLines.length; i++) {
		const [a, b, c] = winningLines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	  		return {
				winnerID: squares[a],
				winningSquares: winningLines[i],
			};
		}
	}

	return '';
}


/**
 * Displays the game.
 */
export default class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			winningSquares: Array(3).fill(null),
			winnerID: null,
			turn: 'X',
		}
	}

	/**
	 * Handles the click on a square.
	 *
	 * @param  {integer} i The ID of the square
	 */
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const turn = this.state.turn;
		let winningSquares = this.state.winningSquares.slice();
		let winnerID = this.state.winnerID;

		// Do nothing if there is a winner
		if (hasWinner(squares)) return;

		// Do nothing if square is already clicked.
		if (squares[i] != null) return;

		// Mark the cell.
		squares[i] = turn;

		// Check if there is a winner after this current move
		let winner = hasWinner(squares);
		if (winner) {
			winningSquares = winner.winningSquares;
			winnerID = winner.winnerID;
		}

		// Set state
		this.setState({
			history: history.concat([{
        		squares: squares,
      		}]),
			stepNumber: history.length,
			winningSquares: winningSquares,
			winnerID: winnerID,
			turn: (turn == 'X') ? 'O' : 'X',
		});
	}

	/**
	 * Displays the component title.
	 *
	 * @return {string} The title
	 */
	displayTitle() {
		const history = this.state.history;
		const current = history[history.length -1];
		const squares = current.squares;
		const winnerID = this.state.winnerID;
		const turn = this.state.turn;

		if (winnerID) {
			return winnerID + ' wins!';
		}

		if (squares.filter(item => item == null).length == 0) {
			return 'No more moves';
		}

		return 'Next turn: ' + turn;
	}

	/**
	 * Restarts the game.
	 * @return void
	 */
	restartGame() {
		this.setState({
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			winningSquares: Array(3).fill(null),
			winnerID: null,
			turn: 'X',
		});
	}

	/**
	 * Jumps to a step in the history.
	 *
	 * @param  {integer} step The step number
	 * @return void
	 */
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			turn: ((step % 2) === 0) ? 'X' : '0',
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winningSquares = this.state.winningSquares;
		const winnerID = this.state.winnerID;
		const turn = this.state.turn;

		return (
			<Container>
				<Col1>
					<ContainerTitle>Tic Tac Toe</ContainerTitle>
					<StatusBar>
						<StatusBarText>{this.displayTitle()}</StatusBarText>
					</StatusBar>
					<Board
						current={current}
						winningSquares={winningSquares}
						winnerID={winnerID}
						turn={turn}
						handleClick={((i) => this.handleClick(i))}
						isInteractive={true}
						squareSize={'large'}
					/>
					<RestartButton onClick={() => this.restartGame()}>Restart game</RestartButton>
				</Col1>
				<Col2>
					<History
						history={history}
						winningSquares={winningSquares}
						winnerID={winnerID}
						turn={turn}
						jumpTo={((i) => this.jumpTo(i))}
						isInteractive={false}
						squareSize={'small'}
					/>
				</Col2>
			</Container>
		);
	}
}
