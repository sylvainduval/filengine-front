import React from "react";
import Auth from '../components/Auth';
import Lefter from './Lefter';

import Libraries from './Libraries';


class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			toRefresh: false
		}
		
		this.handlerState = this.handlerState.bind(this)
	}
	
	handlerState(param, value) {
		this.setState({
			[param]: value
		})
	}
	
	
	render() {
		
		return(
			<Auth>

				<Lefter pgTitle="Home" refresher={this.handlerState} />

				<Libraries />
			</Auth>
		);
	}
}


export default Home;