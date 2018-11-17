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
	justify-content: center;
	align-items: center;
`;

/**
 * The container title style
 */
const ContainerTitle = styled.h1``;


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
		const history = this.state.history;
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
			squares: squares,
			winningSquares: winningSquares,
			winnerID: winnerID,
			turn: (turn == 'X') ? 'O' : 'X',
		});
	}

	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winningSquares = this.state.winningSquares;
		const winnerID = this.state.winnerID;
		const turn = this.state.turn;

		return (
			<Container>
				<ContainerTitle>Tic Tac Toe</ContainerTitle>
				<Board
					current={current}
					winningSquares={winningSquares}
					winnerID={winnerID}
					turn={turn}
					handleClick={((i) => this.handleClick(i))}
				/>
				<History history={history}/>
			</Container>
		);
	}
}
