import { useState, useContext } from "react";
import Switch from 'react-switch';

import { Theme } from "app/contexts";
import * as C from './Components';

export const DeliveryPreferences = () => {
	const theme = useContext(Theme.Context);
	const [checked, setChecked] = useState<any>({
		emailAttachment: true,
		textChanel: false,
		browserChannel: false,
		desktopChannel: false
	});

	const toggleCheck = (name: string) => {
		let newChecked: any = {...checked};
		newChecked[name] = !newChecked[name];
		setChecked(newChecked);
	}

	return (
		<div>
			<h4 className="mb-3">Bill Images</h4>
			<C.SettingGroup>
				<Switch
				onColor={theme.primary}
					onChange={() => {
						toggleCheck('emailAttachment');
					}}
					checked={checked['emailAttachment']}
				/>
				<C.Setting>Send me bills as a PDF Email Attachment</C.Setting>
			</C.SettingGroup>
		</div>
	)
}