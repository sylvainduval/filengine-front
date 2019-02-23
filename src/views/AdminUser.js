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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import AutocompleteSelectLibrary from '../components/AutocompleteSelectLibrary';
import AutocompleteSelectGroup from '../components/AutocompleteSelectGroup';
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
let formGroups = []

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
					
					data.data.level = data.data.isAdmin ? 'isAdmin' : data.data.isConstributor ? 'isContributor' : 'isVisitor';
					updateList(data.data);
				}
			);
		}
	}
	
	handleChange = event => {

		const target = event.target;
		const { data, msg } = this.state;
		
		let value = target.type === 'checkbox' ? target.checked : target.value;
		//value = target.type === 'text' || target.tagName === 'TEXTAREA' ? value.toUpperCase() : value;

		data[target.name] = value;

		msg[target.name] = null;
		msg[target.name] = target.type === 'email' && value.indexOf('@') === -1 ? "Wrong email" : msg[target.name];
		msg[target.name] = target.type === 'text' && target.required && !value.length ? "Required" : msg[target.name];


		// update state
		this.setState({
			data,
			msg
		});
	}
	
	handleSubmit(event) {
		
		console.log('submit !');
		console.log(this.state);
		console.log(formLibraries, formGroups);
		this.handleClose();
		
		event.preventDefault();
	}
	
	render() {
		const { classes, userID } = this.props;
		const { data, msg } = this.state;

		return (
			
			<Dialog
				open={this.state.open}
				scroll="paper"
				aria-labelledby="Edit User"
				onClose={this.handleClose}
			>
				<DialogTitle id="scroll-dialog-title">{userID ? "Edit user" : "Add user"}</DialogTitle>
				
				<DialogContent>
					<form onSubmit={this.handleSubmit} id="userForm">
						<Grid container direction="column" alignItems="center">
							<Grid container item xs={12}>
								<FormControl fullWidth className={classes.formControl} error={!!msg.login}>
									<InputLabel htmlFor="login">Login</InputLabel>
									<Input 
										value={data.login ? data.login : ''} 
										onChange={this.handleChange} 
										inputProps={{
											name: 'login'
										}}
									/>
									<FormHelperText>{msg.login}</FormHelperText>
								</FormControl>
								
								<FormControl fullWidth className={classes.formControl} error={!!msg.password}>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input 
										type="password"
										onChange={this.handleChange}
										inputProps={{
											name: 'password'
										}}
									/>
									<FormHelperText>{msg.password}</FormHelperText>
								</FormControl>
	
								<FormControl fullWidth className={classes.formControl} error={!!msg.email}>
									<InputLabel htmlFor="email">Email</InputLabel>
									<Input 
										type="email" 
										value={data.email ? data.email : ''} 
										onChange={this.handleChange} 
										inputProps={{
											name: 'email'
										}}
									/>
									<FormHelperText>{msg.email}</FormHelperText>
								</FormControl>
																
								<div className={classes.formControl + ' mb-3'}>
									<AutocompleteSelectLibrary 
										list={data.libraries ? data.libraries : []}
										onChange={(libraries) => formLibraries = libraries} 
									/>
								</div>
								
								<div className={classes.formControl + ' mb-3'}>
									<AutocompleteSelectGroup 
										list={data.groups ? data.groups : []}
										onChange={(groups) => formGroups = groups} 
									/>
								</div>
								
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="level">Level</InputLabel>
									<Select
										value={data.level ? data.level : 'isVisitor'}
										onChange={this.handleChange}
										inputProps={{
											name: 'level'
										}}
									>
										<MenuItem value='isVisitor'>Visitor</MenuItem>
										<MenuItem value='isContributor'>Contributor</MenuItem>
										<MenuItem value='isAdmin'>Administrator</MenuItem>
									</Select>
								</FormControl>
								
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">Cancel</Button>
					<Button type="submit" color="primary" form="userForm">Save</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AdminUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUser);