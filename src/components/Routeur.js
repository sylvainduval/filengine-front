import React from "react";
import { BrowserRouter, Route} from "react-router-dom";


import Preferences from '../views/Preferences';
import Home from '../views/Home';
import Admin from '../views/Admin';


class Routeur extends React.Component {
		constructor(props) {
			super(props);
			
			this.state = {
				changed: false
			}
		}

	render() {

		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
					<Route path="/preferences" component={Preferences} />
					<Route path="/admin" component={Admin} />
				</div>
			</BrowserRouter>
		)
	}
}








export default Routeur;
