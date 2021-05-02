import styled from '@emotion/styled';
import {NavLink} from 'react-router-dom';

export const NavbarLink = styled(NavLink)`
	margin-bottom: 0;
	color: #333;
	font-size: 1.25rem;
`;
export const NavbarText = styled.p`
	margin-bottom: 0;
	color: #333;
	font-size: 1.25rem;
`;
export const AppNavContainer = styled.nav`
	height: 5.75rem;
	max-height: 5.75rem;
	min-height: 5.75rem;
	/* border-bottom: 1px solid black; */
	display: flex;
	flex-direction: row;
	flex-basis: auto;
	flex-grow: 0;
	justify-content: space-between;
	background-color: #f8f9fa;
	/* background-color: #eee; */
	/* border-bottom: 1px solid lightgrey; */
`;
export const NavbarSection = styled.div`
	height: 100%;
	flex-basis: auto;
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
`;