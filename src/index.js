import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Routeur from './components/Routeur';

import 'bootstrap/dist/css/bootstrap.min.css';


const THEME = createMuiTheme({
	typography: {
		"fontFamily": "\"Source Sans Pro\" \"Helvetica\", \"Arial\", sans-serif",
		"fontSize": 13,
		"fontWeightLight": 300,
		"fontWeightRegular": 400,
		"fontWeightMedium": 700,
		"fontWeightBold": 700
	},
	palette: {
		primary: blue,
	},
});

const App = () => (
  <MuiThemeProvider theme={THEME}>
    <Routeur />
  </MuiThemeProvider>
 );

ReactDOM.render(
	<App />,
	document.getElementById('root')
);