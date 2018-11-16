import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Square from './../Square';

/**
 * The container style.
 */
const Container = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	alig-items: center;
`;

/**
 * The container title.
 */
const ContainerTitle = styled.h3`
	display: ${props => props.hidden ? 'none' : 'flex'};
	align-self: center;
`;

/**
 * The squares container style.
 */
const SquaresContainer = styled.div`
	border-right: 1px solid;
	border-bottom: 1px solid;
`;

/**
 * The row style in the squares container.
 */
const SquaresRow = styled.div``;

/**
 * The restart button style.
 */
const Button = styled.button`
	margin: 1.25em 0;
	padding: .625em 0;
	background: white;
	border: 1px solid;
`;


/**
 * Imitates the for loop inside JSX
 * - https://reactjs.org/docs/jsx-in-depth.html
 */
 function Repeat(props) {
 	let ret = [];
 	let startAt = props.startAt;
 	let endAt = startAt + props.numberOfTimes;

 	for (let i = startAt; i < endAt; i++) {
 		ret.push(props.children(i));
 	}

 	return ret;
}

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
 * The main class
 */
export default class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			winningSquares: Array(3).fill(null),
			turn: 'X',
		};
	}

	/**
	 * Handles the click on a square.
	 *
	 * @param  {integer} i The ID of the square
	 */
	handleClick(i) {
		// Do nothing if there is a winner
		if (hasWinner(this.state.squares)) return;

		// Do nothing if square is already clicked.
		if (this.state.squares[i] != null) return;

		// Implementing immutability
		const squares = this.state.squares.slice();

		// Mark the cell.
		squares[i] = this.state.turn;

		// Check if there is a winner
		let winner = hasWinner(squares);
		let winningSquares = this.state.winningSquares.slice();
		if (winner) {
			winningSquares = winner.winningSquares;
		}

		// Set state
		this.setState({
			squares: squares,
			winningSquares: winningSquares,
			turn: (this.state.turn == 'X') ? 'O' : 'X',
		});
	}

	/**
	 * Renders a square.
	 *
	 * @param  {integer} i The ID of a square.
	 * @return {Square}    A square element.
	 */
	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
				status={(this.state.winningSquares.includes(i))}
			/>
		);
	}

	/**
	 * Displays the component title.
	 *
	 * @return {string} The title
	 */
	displayTitle() {
		let winner = hasWinner(this.state.squares);

		if (winner) {
			return winner.winnerID + ' wins!';
		}

		if (this.state.squares.filter(item => item == null).length == 0) {
			return 'No more moves';
		}

		return 'Next turn: ' + this.state.turn;
	}

	/**
	 * Restarts the game.
	 */
	restart() {
		this.setState({
			squares: Array(9).fill(null),
			winningSquares: Array(3).fill(null),
			turn: 'X',
		});
	}

	render() {
		return (
			<Container>
				<ContainerTitle>{this.displayTitle()}</ContainerTitle>
				<SquaresContainer>
					<Repeat numberOfTimes={3} startAt={0}>
						{(i) =>
							<SquaresRow>
								<Repeat numberOfTimes={3} startAt={i * 3}>
									{(j) => this.renderSquare(j) }
								</Repeat>
							</SquaresRow>
						}
					</Repeat>
				</SquaresContainer>
				<Button onClick={() => this.restart()}>Restart</Button>
			</Container>
		)
	};
}
