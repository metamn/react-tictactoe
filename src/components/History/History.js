import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Repeat from './../../framework';

/**
 * The container style
 */
const Container = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

/**
 * The container title style
 */
const ContainerTitle = styled.h3``;

/**
 * The item list style.
 */
const Items = styled.ol``;

/**
 * The item style.
 */
const Item = styled.li``;


/**
 * Displays the history of a game.
 */
export default class History extends React.Component {
	/**
	 * Renders a history items.
	 *
	 * @return {[type]} [description]
	 */
	renderItem(i) {
		return (
			<Item>Step #{i}</Item>
		);
	}

	render() {
		return (
			<Container>
				<ContainerTitle>Game history</ContainerTitle>
				<Items>
					<Repeat numberOfTimes={this.props.history.length}>
						{(i) => this.renderItem(i)}
					</Repeat>
				</Items>
			</Container>
		);
	}
}
