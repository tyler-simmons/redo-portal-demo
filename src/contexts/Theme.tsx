import React from 'react';

const defaultTheme = {
    primary: '#3f6786',
	secondary: '#5faedf',
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