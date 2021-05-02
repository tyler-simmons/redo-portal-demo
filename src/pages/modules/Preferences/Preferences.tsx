import { useState, useContext } from "react";
import {Container} from 'react-bootstrap';
import {Switch as RouterSwitch, Route} from 'react-router-dom';


import { Theme } from "app/contexts";
import {ModuleHeading} from 'app/components';
import {NotificationPreferences} from './NotificationPreferences';
import {DeliveryPreferences} from './DeliveryPreferences';

import * as C from './Components';

export const Preferences = () => {
	const theme = useContext(Theme.Context);
	const [checked, setChecked] = useState(false);

	return (
		<Container fluid>
			<RouterSwitch>
				<Route exact path="/portal/preferences/">
					<ModuleHeading>Notification Preferences</ModuleHeading>
					<NotificationPreferences />
				</Route>
				<Route exact path="/portal/preferences/delivery">
					<ModuleHeading>Delivery Preferences</ModuleHeading>
					<DeliveryPreferences />
				</Route>
				<Route exact path="/portal/preferences/site">
					<ModuleHeading>Site Preferences</ModuleHeading>
					<NotificationPreferences />
				</Route>
			</RouterSwitch>
		</Container>
	);
};



