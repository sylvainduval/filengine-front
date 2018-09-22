import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import Auth from '../components/Auth';
import Lefter from './Lefter';
import ReturnMessage from '../components/ReturnMessage';

import session from "../utils/session";
import api from "../utils/api";

const styles = theme => ({

	formControl: {
		margin: theme.spacing.unit / 2,
	},
  button: {
    margin: theme.spacing.unit,
  },
});


class Preferences extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			toRefresh: false,
			user: {},
			msg: {},
			password1: "",
			password2: ""
		}
		
		this.handlerState = this.handlerState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	
	handlerState(param, value) {
		this.setState({
			[param]: value
		})
	}
	
	handleChange(event) {

		const target = event.target;
		const user = this.state.user;
		const msg = this.state.msg;
		
	    let value = target.type === 'checkbox' ? target.checked : target.value;
	    //value = target.type === 'text' || target.tagName === 'TEXTAREA' ? value.toUpperCase() : value;
	    user[target.id] = value;
	    
	    msg[target.id] = null;
	    msg[target.id] = target.type === 'email' && value.indexOf('@') === -1 ? "Wrong email" : msg[target.id];
	    msg[target.id] = target.type === 'text' && target.required && !value.length ? "Required" : msg[target.id];

	    // update state
	    this.setState({
	        user,
	        msg
	    });
	}
	
	handlePasswordChange(event) {
		const target = event.target;
		const user = this.state.user;
		const msg = this.state.msg;
		
		let passwords = {
			password1: this.state.password1,
			password2: this.state.password2
		}
		
		passwords[target.id] = target.value;
		
		msg['password'] = null;
		
		if (passwords.password1 !== passwords.password2) {
			msg['password'] = "Password typing mismatch";
			user['password'] = "";
		}
		else {
			if ((passwords.password1 !== "" ||passwords.password2 !== "") && target.value.length < 3) {
				msg['password'] = "Password too short";
				user['password'] = "";
			}
			else {
				user['password'] = target.value;
			}
		}
		
		
		this.setState({
			password1: passwords.password1,
			password2: passwords.password2,
			user,
	        msg
	    });

	}
	
	handleSubmit(event) {

		if (Object.keys(this.state.msg).length) {
			for (let i in this.state.msg) {
				if (this.state.msg[i] !== null) {
					event.preventDefault();
					return false;
				}
			}
		}
		
		let data = {
			email: this.state.user.email,
		}
		if (this.state.user.password && this.state.user.password.length > 0)
			data.password = this.state.user.password;
		
		api.request(
			{
				method: 'put',
				url: '/user/'+this.state.user._id,
				data: data
			}, function(data, status) { //success
				ReactDOM.render(
					<ReturnMessage variant="success" message="Account Saved" />,
					document.getElementById('returnMessage')
				);
			})

	    event.preventDefault();
	}

	componentDidMount() {
		const userID = session.getParam('_id');
		const handlerState = this.handlerState;
		
		api.request(
			{
				method: 'get',
				url: '/user/'+userID,
				data: {}
			}, function(data, status) { //success
				handlerState('user', data.data);
			}
		)
	  }
	
	render() {
		const { classes } = this.props;
		const data = this.state.user;
		
		const msg = this.state.msg;
		
		if (!Object.keys(data).length)
			return null;
		
		return(		
		  	<Auth>
		  		<Lefter pgTitle="My account" refresher={this.handlerState} />

				<form className="mt-2" onSubmit={this.handleSubmit}>
				
					<Grid container direction="column" alignItems="center">
					
						<Grid container item xs={12} sm={6}>
							<FormControl fullWidth className={classes.formControl} error={!!msg.login}>
								<InputLabel htmlFor="login">Login</InputLabel>
								<Input id="login" value={data.login} onChange={this.handleChange} disabled />
								<FormHelperText>{msg.login}</FormHelperText>
					        </FormControl>

							<FormControl fullWidth className={classes.formControl} error={!!msg.email}>
								<InputLabel htmlFor="email">Email</InputLabel>
								<Input type="email" id="email" value={data.email} onChange={this.handleChange} />
								<FormHelperText>{msg.email}</FormHelperText>
					        </FormControl>

							<FormControl fullWidth className={classes.formControl}>
								<InputLabel htmlFor="password1">Password</InputLabel>
								<Input type="password" id="password1" onChange={this.handlePasswordChange} />
					        </FormControl>
					        
					        <FormControl fullWidth className={classes.formControl} error={!!msg.password}>
								<InputLabel htmlFor="password2">Retype password</InputLabel>
								<Input type="password" id="password2" onChange={this.handlePasswordChange} />
								<FormHelperText>{msg.password}</FormHelperText>
					        </FormControl>

							<Button type="submit" variant="outlined" color="primary" className={classes.button}>
						        Save
						    </Button>
						</Grid>
						
					</Grid>
					
				</form>
			</Auth>
		);
	}
		

}

Preferences.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Preferences);