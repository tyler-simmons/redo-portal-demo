/** @jsxImportSource @emotion/react */
import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faDollarSign,  faChartBar, faCaretRight, faClock, faCog, faQuestionCircle, faUser, faWallet, faHammer, faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {css} from '@emotion/react';

import * as Components from './SidebarComponents';
const {SidebarContainer, LogoContainer, SidebarImg, 
    SideNavContainer, SideLink, IconContainer, SideLinkSubMenu,
    SideLinkSubMenuItem, SideFooterContainer, FooterLink, FooterIcon, SidebarLink} = Components;

export const Sidebar = () => {
	let location = useLocation();

	return (
		<SidebarContainer>
			<LogoContainer>
				<SidebarImg src="/sidebar-logo.png"  />
				{/* <AwsLogo /> */}
			</LogoContainer>
			<SideNavContainer >
				
				<SidebarLink exact to="/portal" css={css`margin-top: 5rem;`} icon={faHome}>Home</SidebarLink>

				<SidebarLink exact to="/portal/billing" icon={faDollarSign} spin>Payments</SidebarLink>

				

				<SideLinkSubMenu
					show={location.pathname.startsWith("/portal/billing") ?? false}
				>
					{/* <SideLinkSubMenuItem exact to="/portal/billing">
						Payments
					</SideLinkSubMenuItem>
					<SideLinkSubMenuItem to="/portal/billing/payment-methods">
						My Wallet
					</SideLinkSubMenuItem> */}
					<SideLinkSubMenuItem exact to="/portal/billing">
						Payment History
					</SideLinkSubMenuItem>
					<SideLinkSubMenuItem to="/portal/billing/one-time">
						One-Time Payments
					</SideLinkSubMenuItem>
					<SideLinkSubMenuItem to="/portal/billing/autopay">
						Schedule AutoPay
					</SideLinkSubMenuItem>
					
				</SideLinkSubMenu>

				{/* <SidebarLink exact to="/portal/payment-history" icon={faChartBar}>Payment History</SidebarLink> */}

				<SidebarLink exact to="/portal/wallet" icon={faWallet}>My Wallet</SidebarLink>

				<SidebarLink exact to="/portal/statements" icon={faFileAlt}>Document Archive</SidebarLink>

				<SidebarLink exact to="/portal/tools" icon={faCalculator}>Tools</SidebarLink>

				<SidebarLink exact to="/portal/preferences" icon={faUser} spin>My Profile</SidebarLink>

				<SideLinkSubMenu
					show={
						location.pathname.startsWith("/portal/preferences") ?? false
					}
				>
					<SideLinkSubMenuItem exact to="/portal/preferences">
						Notification Preferences
					</SideLinkSubMenuItem>
					<SideLinkSubMenuItem to="/portal/preferences/delivery">
						Delivery Preferences
					</SideLinkSubMenuItem>
					<SideLinkSubMenuItem to="/portal/preferences/site">
						Site Preferences
					</SideLinkSubMenuItem>
				</SideLinkSubMenu>

			</SideNavContainer>
			
			<SideFooterContainer className="text-center">
				<FooterLink to="/portal/help">
					<FooterIcon icon={faQuestionCircle} />
					{/* <i className="fas fa-question-circle"></i> */}
					Help
				</FooterLink>
			</SideFooterContainer>
		</SidebarContainer>
	);
};