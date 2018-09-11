import React from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import api from "../utils/api.js";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
		};
		
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	

	
	handleChange(event) {

	    this.setState({
	      [event.target.name]: event.target.value
	    });

	}

	
	handleSubmit(event) {

	    event.preventDefault();
	    
	    api.request(
	    	this.props,
			{
              method: 'post',
              url: '/login',
              data: {
			      login: this.state.login,
			      password: this.state.password
			    }
            }, function(props, data, status) { //success

	            props.handler({session: data.data});
	            
            })
	}
	
	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
		      <CssBaseline />
			      <main className={classes.layout}>
					<Paper className={classes.paper}>
					
					<Avatar className={classes.avatar}>
					    <LockIcon />
					</Avatar>
						
						<Typography variant="headline">filengine</Typography>
						
						<form className={classes.form} onSubmit={this.handleSubmit}>
							
							<FormControl margin="normal" required fullWidth>
					            <InputLabel htmlFor="login">Login</InputLabel>
					            <Input 
					            	id="login" 
					            	name="login" 
					            	autoComplete="login" 
					            	autoFocus 
					            	value={this.state.login} 
					            	onChange={this.handleChange} 
					            />
					        </FormControl>
					        
					        <FormControl margin="normal" required fullWidth>
					            <InputLabel htmlFor="password">Password</InputLabel>
					            <Input
					                name="password"
					                type="password"
					                id="password"
					                autoComplete="current-password"
					                value={this.state.password} 
					                onChange={this.handleChange}
					            />
					        </FormControl>

					        <Button
					            type="submit"
					            fullWidth
					            variant="raised"
					            color="primary"
					            className={classes.submit}
					        >
					            Ignition!
							</Button>
						

						</form>
			
					</Paper>
			    </main>
			</React.Fragment>
		);
	}
	
}


LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);