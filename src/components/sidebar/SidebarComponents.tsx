import React from 'react';
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';


export const SidebarLink = ({icon, children, spin, ...rest}: {icon: IconProp, children: React.ReactNode, spin?: boolean, [x:string]: any}) => {
	return (
		<SideLink exact to="/portal" {...rest}>
			<IconContainer>
				<FontAwesomeIcon icon={icon} />
			</IconContainer>
			{spin 
			?  <div>
					<span className="mr-2">{children}</span>
					<span ><FontAwesomeIcon icon={faCaretRight} className="spin" /></span>
				</div>
			: <div>{children}</div>
			}
			
		</SideLink>
	)
}



//Sidebar
export const SidebarImg = styled.img`
	max-height: 5rem;
	object-fit: contain;
`;
export const SidebarContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #eee;
	min-width: 18rem;
`;
export const LogoContainer = styled.div`
	flex-basis: auto;
	flex-grow: 0;
	height: 5.75rem;
	max-height: 5.75rem;
	min-height: 5.75rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 1rem;
	padding-right: 1rem;
	background-color: #f8f9fa;
`;
export const SideNavContainer = styled.div`
	flex-basis: auto;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
`;
export const SideFooterContainer = styled.div`
	flex-basis: auto;
	flex-grow: 0;
`;
export const SideLink = styled(NavLink)`
	cursor: pointer;
	font-size: 1.4rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding-top: 1rem;
	padding-bottom: 1rem;
	padding-left: 1rem;
	padding-right: 2rem;
	font-weight: 600;
	color: ${props => props.theme.colors.primary};
	flex-wrap: nowrap;
	white-space: nowrap;
    transform: 1s;
	-webkit-transform: 1s;
	& > div.side-sub {
		display: none;
	}
	&:hover {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
		text-decoration: none;
	}
	&.active {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
	}

	&.active > div > span > .spin {
		transition: transform 0.5s;
		transform: rotate(90deg);
	}
`;


export interface ShowProp {
    show?: boolean;
	[x:string]: any
}
export const SideLinkSubMenu = styled.div<ShowProp>`
	text-align: center;
	display: flex;
	flex-direction: column;
	margin-top: ${props => props.show ? "0.5rem" : "0"};
	margin-bottom: ${props => props.show ? "0.5rem" : "0"};
	max-height: ${props => props.show ? "100%" : "0"};
	overflow: hidden;
	transition: 0.3s;
`;

export const SideLinkSubMenuItem = styled(NavLink)`
	color: ${props => props.theme.colors.primary};
	font-size: 1.2rem;
	text-align: left;
	padding-left: 4.4rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	&:hover {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
		text-decoration: none;
	}
	&.active {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
	}
`;

export const IconContainer = styled.div`
	width: 2.5rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-right: 1rem;
	line-height: 1;
	& > i {
		line-height: 1;
		vertical-align: middle;
	}
`;

export const FooterLink = styled(NavLink)`
	cursor: pointer;
	vertical-align: middle;
	font-size: 1.4rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 1rem;
	padding-bottom: 1rem;
	padding-left: 1rem;
	padding-right: 2rem;
	font-weight: 600;
	color: ${props => props.theme.colors.primary};
	flex-wrap: nowrap;
	white-space: nowrap;
	line-height: 1;
	margin-bottom: 1rem;
	&:hover {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
		text-decoration: none;
	}
	&.active {
		color: #fafafa;
		background-color: ${props => props.theme.colors.primary};
	}
`;

export const FooterIcon = styled(FontAwesomeIcon)`
	font-size: 1.4rem;
	vertical-align: middle;
	margin-right: 0.5rem;
`;