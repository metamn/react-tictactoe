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
	renderItem(i, history, jumpTo) {
		const current = history[i-1];
		const winningSquares = Array(3).fill(null);

		return (
			<Item key={i} onClick={(i) => jumpTo(i)}>
				<Board
					current={current}
					winningSquares={winningSquares}
					winnerID={null}
					turn={null}
					handleClick={null}
					isInteractive={false}
					squareSize={'small'}
				/>
			</Item>
		);
	}

	render() {
		const history = this.props.history;
		const jumpTo = this.props.jumpTo;

		return (
			<Container>
				<ContainerTitle>Game history</ContainerTitle>
				<Items>
					<Repeat numberOfTimes={history.length} startAt={1}>
						{(i) => this.renderItem(i, history, jumpTo)}
					</Repeat>
				</Items>
			</Container>
		);
	}
}
