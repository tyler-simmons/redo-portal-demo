import { useState, useContext } from "react";
import Switch from 'react-switch';
import {faEnvelope, faMobile, faGlobe, faDesktop} from '@fortawesome/free-solid-svg-icons';

import { Theme } from "app/contexts";

import * as C from './Components';

export const NotificationPreferences = () => {
	const theme = useContext(Theme.Context);
	const [checked, setChecked] = useState<any>({
		emailChannel: false,
		textChanel: false,
		browserChannel: false,
		desktopChannel: false
	});

	const [drop, setDrop] = useState<any>({
		announcements: false
	})

	const toggleCheck = (name: string) => {
		let newChecked: any = {...checked};
		newChecked[name] = !newChecked[name];
		setChecked(newChecked);
	}

	const toggleDrop = (name: string) => {
		let newDrop: any = {...drop};
		newDrop[name] = !newDrop[name];
		setDrop(newDrop);
	}

	return (
		<div>
			<h4 className="mb-3">Notification Channels</h4>
			<C.SettingGroup>
				<Switch
				
					onColor={theme.primary}
					onChange={() => {
						toggleCheck('emailChannel');
					}}
					checked={checked['emailChannel']}
				/>
				<C.Setting>Email notifications <C.SettingIcon icon={faEnvelope} color={'#fce0a4'} /></C.Setting>
			</C.SettingGroup>
			<C.SettingGroup>
				<Switch
				onColor={theme.primary}
					onChange={() => {
						toggleCheck('textChannel');
					}}
					checked={checked['textChannel']}
				/>
				<C.Setting>Text notifications <C.SettingIcon icon={faMobile} color={'#666666'} /></C.Setting>
			</C.SettingGroup>
			<C.SettingGroup>
				<Switch
				onColor={theme.primary}
				onChange={() => {
						toggleCheck('browserChannel');
					}}
					checked={checked['browserChannel']}
				/>
				<C.Setting>Browser notifications <C.SettingIcon icon={faGlobe} color={'#18bcef'}/></C.Setting>
			</C.SettingGroup>
			<C.SettingGroup>
				<Switch
				onColor={theme.primary}
					onChange={() => {
						toggleCheck('desktopChannel');
					}}
					checked={checked['desktopChannel']}
				/>
				<C.Setting>Desktop notifications <C.SettingIcon icon={faDesktop} color={theme.secondary} /></C.Setting>
			</C.SettingGroup>

			
			
		</div>
	);
};