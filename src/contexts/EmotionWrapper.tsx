import React,{useContext} from 'react';
import {ThemeProvider} from '@emotion/react';
import {Theme} from 'app/contexts';

export const EmotionWrapper = ({ children }: {children: React.ReactNode}) => {
	const theme = useContext(Theme.Context);
	const emTheme = {
		colors: theme,
	};
	return <ThemeProvider theme={emTheme}>{children}</ThemeProvider>;
};