import { createContext } from 'react';

interface ThemeContextTypes {
	colorTheme: string;
	changeColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextTypes>({
	colorTheme: 'cyan',
	changeColor: () => {},
});
