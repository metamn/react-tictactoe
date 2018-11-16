import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

/**
 * The container
 * @type {[type]}
 */
const Container = styled.section``;

/**
 * The container title
 * @type {[type]}
 */
const ContainerTitle = styled.h1``;


/**
 * [Game description]
 * @extends React
 */
export default class Game extends React.Component {
	render() {
		return (
			<Container>
				<ContainerTitle>Tic Tac Toe</ContainerTitle>
			</Container>
		);
	}
}
