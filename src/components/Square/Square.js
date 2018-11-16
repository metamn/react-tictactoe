import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Button = styled.button`
	background: #fff;
	border: 1px solid;
	border-right: 0;
	border-bottom: 0;
	padding: 1.25em;
`;

export default class Square extends React.Component {
	render() {
		return (
			<Button>{this.props.value}</Button>
		)
	}
}
