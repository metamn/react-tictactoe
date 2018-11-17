import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Square from './../Square';
import Repeat from './../../framework';

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
const SquaresRow = styled.div`
	display: flex;
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
		const isInteractive = this.props.isInteractive;
		const squareSize = this.props.squareSize;

		return (
			isInteractive ? (
				<Square
					key={i}
					value={squares[i]}
					onClick={() => this.props.handleClick(i)}
					status={(winningSquares.includes(i))}
					squareSize={squareSize}
				/>
			) : (
				<Square
					key={i}
					value={squares[i]}
					onClick={null}
					status={(winningSquares.includes(i))}
					squareSize={squareSize}
				/>
			)
		);
	}

	render() {
		return (
			<SquaresContainer>
				<Repeat numberOfTimes={3} startAt={0}>
					{(i) =>
						<SquaresRow key={i}>
							<Repeat numberOfTimes={3} startAt={i * 3}>
								{(j) => this.renderSquare(j) }
							</Repeat>
						</SquaresRow>
					}
				</Repeat>
			</SquaresContainer>
		)
	};
}
