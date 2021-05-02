import React from 'react';

const defaultTheme = {
    primary: '#0e7abf',
	secondary: '#149984',
}

const ThemeContext = React.createContext(defaultTheme);

export const Theme = {
    default: defaultTheme,
    Context: ThemeContext,
    Provider: ({
        children,
        theme = defaultTheme
    }: any) => {
        return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
    }
}