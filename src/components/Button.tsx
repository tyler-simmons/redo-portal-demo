/** @jsxImportSource @emotion/react */
import React from 'react';
import {css, SerializedStyles} from '@emotion/react';

const buttonBase = css`
	display: inline-block;
	font-weight: 600;
	text-align: center;
	vertical-align: middle;
	user-select: none;
	color: #e8eef2;
	background-color: #006ba6;
	border: 1px solid transparent;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	outline: none;
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
		border-color 0.3s ease-in-out, box-shadow 0.2s ease-in-out;
	&:hover {
		background-color: #005d8f;
		border-color: #005d8f;
		color: #efefef;
	}
	&:focus {
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgba(20, 116, 164, 0.25);
		background-color: #005d8f;
		border-color: #005d8f;
		color: #efefef;
	}
`;

const rounded = css`
	border-radius: 0.25rem;
`;
const rectangle = css`
	border-radius: 0;
`;
const pill = css`
	padding-left: 3rem;
	padding-right: 3rem;
	border-radius: 1rem;
`;

const ShapeMap = new Map<string, SerializedStyles>();
ShapeMap.set('rectangle', rectangle);
ShapeMap.set('rounded', rounded);
ShapeMap.set('pill', pill);

const hexRegexString = /^#[0-9a-fA-F]{6}$/;

const computeAltShade = (color: string) => {
	const hexRegex = new RegExp(hexRegexString);
	if (!hexRegex.test(color)) {
		return null;
	}
	let r: string = color.substring(1, 3);
	let g: string = color.substring(3, 5);
	let b: string = color.substring(5);
	let newR: string = Math.floor(parseInt(r, 16) * 0.8).toString(16);
	let newG: string = Math.floor(parseInt(g, 16) * 0.8).toString(16);
	let newB: string = Math.floor(parseInt(b, 16) * 0.8).toString(16);

	return {
		hex: `#${newR}${newG}${newB}`,
		r: parseInt(newR, 16),
		g: parseInt(newG, 16),
		b: parseInt(newB, 16),
		lightR: parseInt(r, 16) + (255 - parseInt(r, 16)) * 0.1,
		lightG: parseInt(g, 16) + (255 - parseInt(g, 16)) * 0.1,
		lightB: parseInt(b, 16) + (255 - parseInt(b, 16)) * 0.1,
	};
};
const cssBtnColor = (colors: ColorArg) => {
	let altColor = computeAltShade(colors.background);
	if (altColor === null) {
		return css`
			color: #ffffff;
			background-color: #555555;
			border-color: #555555;
		`;
	}
	return css`
		color: ${colors.font};
		background-color: ${colors.background};
		border-color: ${colors.background};
		&:hover {
			color: ${colors.font};
			background-color: ${altColor.hex};
			border-color: ${altColor.hex};
		}
		&:focus {
			box-shadow: 0 0 0 0.2rem
				rgba(${altColor.lightR}, ${altColor.lightG}, ${altColor.lightB}, 0.25);
			color: ${colors.font};
			background-color: ${altColor.hex};
			border-color: ${altColor.hex};
		}
	`;
};
const cssOutlineColor = (colors: ColorArg) => {
	let altColor = computeAltShade(colors.background);
	if (altColor === null) {
		return css`
			color: #ffffff;
			background-color: #555555;
			border-color: #555555;
		`;
	}
	return css`
		color: ${colors.background};
		background-color: transparent;
		border-color: ${colors.background};
		border-width: 2px;
		&:hover {
			color: ${colors.font};
			background-color: ${colors.background};
			border-color: ${colors.background};
		}
		&:focus {
			box-shadow: 0 0 0 0.2rem
				rgba(${altColor.lightR}, ${altColor.lightG}, ${altColor.lightB}, 0.25);
			color: ${colors.font};
			background-color: ${colors.background};
			border-color: ${colors.background};
		}
	`;
};

type ColorArg = {
	font: string;
	background: string;
};
const defaultColorArg: ColorArg = {
	font: '#e8eef2',
	background: '#006ba6',
};
type ButtonProps = {
	colors?: ColorArg;
	shape?: string;
	outline?: boolean;
	onClick?: (e: React.MouseEvent) => any;
	rest?: any[];
	className?: any;
    [x:string]: any;
};
export const Button = ({
	children,
	colors,
	shape,
	outline,
	onClick,
	rest,
	className,
}: ButtonProps) : JSX.Element => {
	let classes = [buttonBase, rounded];

	colors !== undefined && classes.push(cssBtnColor(colors));
	shape !== undefined &&
		ShapeMap.get(shape) !== undefined &&
		classes.push(ShapeMap.get(shape) ?? rounded);
	outline && classes.push(cssOutlineColor(colors ?? defaultColorArg));

	return (
		<button onClick={onClick} css={classes} className={`${className}`} {...rest}>
			{children}
		</button>
	);
};