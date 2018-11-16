import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Square from './../Square';

/**
 * Styles
 *
 */
const Container = styled.section``;

const ContainerTitle = styled.h3`
	display: ${props => props.hidden ? 'none' : 'flex'};
`;

const SquaresContainer = styled.div`
	border-right: 1px solid;
	border-bottom: 1px solid;
`;

const SquaresRow = styled.div``;

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
 * The main class
 */
export default class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
		};
	}

	renderSquare(i) {
		return (
			<Square
				value={i}
			/>
		);
	}

	render() {
		return (
			<Container>
				<ContainerTitle hidden>The board</ContainerTitle>
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
			</Container>
		)
	};
}