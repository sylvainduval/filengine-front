import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import AutocompleteSelectLibrary from '../components/AutocompleteSelectLibrary';
import api from "../utils/api.js";

const styles = theme => ({

	formControl: {
		margin: theme.spacing.unit / 2,
		width: '100%'
	},
  button: {
    margin: theme.spacing.unit,
  },
});

//Listes des librairies de l'utilisateur telles qu'affichées dans le formulaire
let formLibraries = []

class AdminUser extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			//Si register vaut true, il faudra inscrire l'utilisateur (POST /register)
			//puis écrire ses données (PUT /user/_id)
			register: false,
			data: {},
			msg: {},
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  	}
  	
	handleClose = () => {
		this.setState({ open: false, data: {}, msg: {}, register: false });
		this.props.onClose();
	};
	
	updateList = data => {
	    this.setState({
	      data: data
	    });
	}

	componentWillReceiveProps(nextProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.open !== nextProps.open) {
			this.setState({
				open: nextProps.open,
				register: nextProps.userID === null ? true : false
			})
		}

		if (nextProps.userID !== null && nextProps.open === true) {
			
			const updateList = this.updateList;
			
			api.request(
				{
					method: 'get',
					url: '/user/'+nextProps.userID
				}, function(data, status) { //success
					updateList(data.data);
				}
			);
		}
	}
	
	handleChange(event) {

		const target = event.target;
		const { data, msg } = this.state;
		
	    let value = target.type === 'checkbox' ? target.checked : target.value;
	    //value = target.type === 'text' || target.tagName === 'TEXTAREA' ? value.toUpperCase() : value;
	    data[target.id] = value;
	    
	    msg[target.id] = null;
	    msg[target.id] = target.type === 'email' && value.indexOf('@') === -1 ? "Wrong email" : msg[target.id];
	    msg[target.id] = target.type === 'text' && target.required && !value.length ? "Required" : msg[target.id];

	    // update state
	    this.setState({
	        data,
	        msg
	    });
	}
	
	handleSubmit(event) {
		
		console.log('submit !');
		console.log(this.state);
		console.log(formLibraries);
		this.handleClose();
		
		event.preventDefault();
	}
	
	render() {
		const { classes, userID } = this.props;
		const { data, msg } = this.state;
		
		//console.log(data);

		return (
			
			<Dialog
				open={this.state.open}
				scroll="paper"
				aria-labelledby="Edit User"
				onClose={this.handleClose}
			>
				<DialogTitle id="scroll-dialog-title">{userID ? "Edit user" : "Add user"}</DialogTitle>

				<form onSubmit={this.handleSubmit}>
					<DialogContent>
						<Grid container direction="column" alignItems="center">
							<Grid container item xs={12}>
								<FormControl fullWidth className={classes.formControl} error={!!msg.login}>
									<InputLabel htmlFor="login">Login</InputLabel>
									<Input id="login" value={data.login ? data.login : ''} onChange={this.handleChange} />
									<FormHelperText>{msg.login}</FormHelperText>
								</FormControl>
								
								<FormControl fullWidth className={classes.formControl}  error={!!msg.password}>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input type="password" id="password" />
									<FormHelperText>{msg.password}</FormHelperText>
								</FormControl>
								
								<div className={classes.formControl + ' mb-3'}>
									<AutocompleteSelectLibrary 
										list={data.libraries ? data.libraries : []}
										onChange={(libraries) => formLibraries = libraries} 
									/>
								</div>
	
								<FormControl fullWidth className={classes.formControl} error={!!msg.email}>
									<InputLabel htmlFor="email">Email</InputLabel>
									<Input type="email" id="email" value={data.email ? data.email : ''} onChange={this.handleChange} />
									<FormHelperText>{msg.email}</FormHelperText>
								</FormControl>
								
							</Grid>
						</Grid>

					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">Cancel</Button>
						<Button type="submit" color="primary">Save</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

AdminUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUser);