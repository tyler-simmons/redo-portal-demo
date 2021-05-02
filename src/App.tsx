import React,{ useState, useContext } from 'react';
import './custom.scss';

import { Theme, EmotionWrapper } from 'app/contexts';
import { ThemeProvider } from '@emotion/react';
import {AppRoutes} from './AppRoutes';

const App = () => {  
	return (
		<Theme.Provider value={Theme.default}>
			<EmotionWrapper>
				<AppRoutes />
			</EmotionWrapper>
		</Theme.Provider>
	);
}

export default App;
