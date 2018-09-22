import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import api from "../utils/api.js";

const styles = theme => ({
  formControl: {
   /* margin: theme.spacing.unit,*/
    minWidth: 120,
  }
});

class SelectLibrary extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			library: '',
			libraries: []
		}

	}
	
	updateList = data => {
	    this.setState({
	      libraries: data
	    });
	}
	
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		this.props.onChange(event.target.value);
	};

	
	componentDidMount() {
		const updateList = this.updateList;
		
		api.request(
			{
              method: 'get',
              url: '/libraries',
              data: {}
            }, function(data, status) { //success
	            updateList(data.data);
            });

	  }
	
	render() {
		const { classes } = this.props;

    	const options = this.state.libraries;
		
		return (
			<FormControl className={classes.formControl} margin='dense'>
	          <InputLabel htmlFor="select-library">Library</InputLabel>
	          <Select
	          	value={this.state.library}
	            onChange={this.handleChange}
	            inputProps={{
	              name: 'library',
	              id: 'select-library',
	            }}
	          >
	          <MenuItem value="">
	              <em>All</em>
	            </MenuItem>

	          	{options.map((option, index) => (
		            <MenuItem
		              key={option._id}
		              value={option.id}
		            >
		              {option.id}
		            </MenuItem>
		          ))}
	          </Select>
	        </FormControl>
		)
	}
	
	
}

SelectLibrary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectLibrary);