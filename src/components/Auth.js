import React from "react";

import LoginForm from "../views/LoginForm";
import session from "../utils/session";


class Auth extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			token: null,
			toRefresh: false
		};
		
		var currentToken = session.getParam('token');
		if (currentToken !== null) {
			this.state = {
				isLoggedIn: true,
				token: currentToken
			};
			
		}
		
		this.connect = this.connect.bind(this);
	}
	
	componentDidUpdate() {
		if (session.getParam('token') === null && (this.state.isLoggedIn && !this.state.toRefresh)) {
			this.setState({
				isLoggedIn: false,
				token: null
			});
			return true;
		}
		
		if (session.getParam('token') === null && this.state.isLoggedIn) {
			this.setState({
				isLoggedIn: false,
				token: null
			});
		}
	}
	
	connect(params) {

		session.set(params.session);
		
		this.setState({
	    	isLoggedIn: true,
			token: params.token,
			toRefresh: true
	    });
	}
	


	render() {
		let retour;

		this.state.isLoggedIn ? (
			retour = this.props.children
		) : (
			retour = <LoginForm handler={this.connect}  />
		)

		return (
			<div>{retour}</div>
		)
	}
}





export default Auth;
