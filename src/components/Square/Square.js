import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Button = styled.button`
	background: #fff;
	border: 1px solid;
	border-right: 0;
	border-bottom: 0;
	padding: 1.25em;
	width: 3.75em;
	height: 3.75em;
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
		return (
			<Button onClick={this.props.onClick}>
				{this.display(this.props.value)}
			</Button>
		)
	}
}
