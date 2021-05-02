import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faEnvelope, faQuestionCircle, faQuestion} from '@fortawesome/free-solid-svg-icons';

import {ColorIcon} from 'app/components';


import * as Components from './NavbarComponents';
const {AppNavContainer, NavbarSection, NavbarLink, NavbarText} = Components;

export const Navbar = ({firstName = 'John'}: {firstName?: string}) => {
    return (
		<AppNavContainer>
			<NavbarSection className="text-right mr-5 justify-content-end">
				<NavbarLink className="mr-3" to="/portal/profile">
					Welcome, <strong>{firstName}</strong>
				</NavbarLink>
				<NavbarText className="mr-3">|</NavbarText>
				<NavbarLink className="mr-3" to="/portal/profile">
					<ColorIcon className="mr-2" icon={faUser} />My Profile
				</NavbarLink>
				<NavbarText className="mr-3">|</NavbarText>
				<NavbarLink className="mr-3" to="/portal/contact">
					<ColorIcon className="mr-2" icon={faEnvelope} />Contact Us
				</NavbarLink>
				<NavbarText className="mr-3">|</NavbarText>
				<NavbarLink className="mr-3" to="/portal/contact">
					<ColorIcon className="mr-2" icon={faQuestionCircle} />Help
				</NavbarLink>
				<NavbarText className="mr-3">|</NavbarText>
				{/* <NavbarText>
					<i className="fas fa-question-circle mr-4 artesian-color"></i>Help
				</NavbarText> */}
				<NavbarLink className="mr-2" to="/portal/contact">
					Logout
				</NavbarLink>
			</NavbarSection>
		</AppNavContainer>
	);
}