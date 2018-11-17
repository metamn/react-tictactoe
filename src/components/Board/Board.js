import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Square from './../Square';
import Repeat from './../../framework';

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
 * The container title style.
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
 * The main class
 */
export default class Board extends React.Component {
	/**
	 * Renders a square.
	 *
	 * @param  {integer} i The ID of a square.
	 * @return {Square}    A square element.
	 */
	renderSquare(i) {
		const squares = this.props.current.squares;
		const winningSquares = this.props.winningSquares;

		return (
			<Square
				value={squares[i]}
				onClick={() => this.props.handleClick(i)}
				status={(winningSquares.includes(i))}
			/>
		);
	}

	/**
	 * Displays the component title.
	 *
	 * @return {string} The title
	 */
	displayTitle() {
		const winnerID = this.props.winnerID;
		const squares = this.props.current.squares;
		const turn = this.props.turn;

		if (winnerID) {
			return winnerID + ' wins!';
		}

		if (squares.filter(item => item == null).length == 0) {
			return 'No more moves';
		}

		return 'Next turn: ' + turn;
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
				<Button>Restart</Button>
			</Container>
		)
	};
}
