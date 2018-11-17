import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Button = styled.button`
	background: ${props => (props.status) ? '#000' : '#fff'};
	color: ${props => (props.status) ? '#fff' : '#000'};
	border: 1px solid #000;
	border-right: 0;
	border-bottom: 0;
	padding: ${props => (props.size != 'small') ? '1.25em' : '0 .3125em'};
	width: ${props => (props.size != 'small') ? '3.75em' : '1.25em'};
	height: ${props => (props.size != 'small') ? '3.75em' : '1.25em'};
	font-size: ${props => (props.size != 'small') ? 'normal' : 'smaller'};
	font-weight: ${props => (props.size != 'small') ? 'bold' : 'normal'};
`;

export default class Square extends React.Component {
	/**
	 * Make sure an empty character is displayed when the `value` is null.
	 * Otherwise when an 'X' or 'O' value is set the layout (borders) breaks.
	 *
	 * `&nbsp;` cannot be displayed so it's replaced with an Unicode.
	 * @link https://stackoverflow.com/questions/37909134/nbsp-jsx-not-working
	 *
	 * @param  {string} value The value of the cell
	 * @return {string}       The value of the cell, or an empty char
	 */
	display(value) {
		return (value) ? value : '\u00A0';
	}

	render() {
		const status = this.props.status;
		const onClick = this.props.onClick;
		const value = this.props.value;
		const size = this.props.squareSize;

		return (
			<Button size={size} status={status} onClick={onClick}>
				{this.display(value)}
			</Button>
		)
	}
}
