import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Board from './../Board';

/**
 * The container style
 */
const Container = styled.section`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

/**
 * The container title style
 */
const ContainerTitle = styled.h1``;


/**
 * The main component
 */
export default class Game extends React.Component {
	render() {
		return (
			<Container>
				<ContainerTitle>Tic Tac Toe</ContainerTitle>
				<Board />
			</Container>
		);
	}
}
