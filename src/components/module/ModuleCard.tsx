/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Card} from 'react-bootstrap';

export interface ModuleCardProps {
	accent?: string;
	[x:string]: any;
};

const moduleCardBase = css`
	height: 100%;
	padding: 1.5rem 3rem;
`;

const getStyle = (accent: string) => css`
    ${moduleCardBase};
    border-top: 4px solid ${accent};
`;

export const ModuleCard = ({
	children,
	accent,
	...rest
}: ModuleCardProps) => {
	
    return (
		<Card css={getStyle('#0e7abf')} {...rest}>
			{children}
		</Card>
	);
};