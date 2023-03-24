import { createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		palette: {
			primary: {
				main: '#556cd6',
			},
			secondary: {
				main: '#19857b',
			},
		},
		fontSize: 12,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
});

export default theme