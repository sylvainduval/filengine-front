import React from "react";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import session from "../utils/session";


class AuthDisconnect extends React.Component {
	constructor(props) {
		super(props);
				
		this.handler = this.handler.bind(this);
		
		this.state = {
			redirect: false
			
		}
	}
	
	
	handler() {

		session.remove();
		
		this.setState({ redirect: true });
		
		this.props.refresher();
	}
	
	render() {

		return (
			<ListItem button onClick={this.handler}>
	            <ListItemIcon>
	            	<PowerSettingsNew />
	            </ListItemIcon>
	            <ListItemText primary="Logout" />
	        </ListItem>
		);
	}
	
	
}


	
export default AuthDisconnect;