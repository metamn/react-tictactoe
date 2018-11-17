import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Repeat from './../../framework';
import Board from './../Board';

/**
 * The container style
 */
const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`;

/**
 * The container title style
 */
const ContainerTitle = styled.h3`
	writing-mode: sideways-lr;
`;

/**
 * The item list style.
 */
const Items = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 15em;
`;

/**
 * The item style.
 */
const Item = styled.div`
	margin-bottom: 1.25em;
	margin-right: 1.25em;
`;


/**
 * Displays the history of a game.
 */
export default class History extends React.Component {
	/**
	 * Renders a history item.
	 */
	renderItem(i) {
		const history = this.props.history;
		const current = history[i];
		const winningSquares = this.props.winningSquares;
		const winnerID = this.props.winnerID;
		const turn = this.props.turn;
		const isInteractive = this.props.isInteractive;
		const squareSize = this.props.squareSize;

		return (
			<Item key={i} onClick={() => this.props.jumpTo(i)}>
				<Board
					current={current}
					winningSquares={winningSquares}
					winnerID={winnerID}
					turn={turn}
					handleClick={null}
					isInteractive={isInteractive}
					squareSize={squareSize}
				/>
			</Item>
		);
	}

	render() {
		const history = this.props.history;

		return (
			<Container>
				<ContainerTitle>Game history</ContainerTitle>
				<Items>
					<Repeat numberOfTimes={history.length} startAt={0}>
						{(i) => this.renderItem(i)}
					</Repeat>
				</Items>
			</Container>
		);
	}
}
