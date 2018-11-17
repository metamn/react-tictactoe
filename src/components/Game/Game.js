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
 * Displays the game.
 */
export default class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			history: Array(),
		}
	}
	
	render() {
		return (
			<Container>
				<ContainerTitle>Tic Tac Toe</ContainerTitle>
				<Board/>
				<History history={this.state.history}/>
			</Container>
		);
	}
}
