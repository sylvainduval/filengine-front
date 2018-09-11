import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import api from "../utils/api.js";

const styles = theme => ({
  root: {
    //width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  //paper: {
  //  padding: theme.spacing.unit * 2,
    //textAlign: 'center',
  //  color: theme.palette.text.secondary,
  //},
});

class Libraries extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			anchorEl: null,
			selectedIndex: 0,
			libraries: []
		}
		
		this.updateList = this.updateList.bind(this)
	}

	handleClickListItem = event => {
	    this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuItemClick = (event, index) => {
	    this.setState({ selectedIndex: index, anchorEl: null });
	};

	handleClose = () => {
	    this.setState({ anchorEl: null });
	};
	
	updateList(data) {
	    this.setState({
	      libraries: data
	    });

	}
	
	componentDidMount() {
		api.request(
	    	{
		    	updateList: this.updateList
	    	},
			{
              method: 'get',
              url: '/libraries',
              data: {}
            }, function(props, data, status) { //success
	            props.updateList(data.data);
            })

	  }

	render() {
		const { classes } = this.props;
    	const { anchorEl } = this.state;

    	const options = this.state.libraries;

    	if (Object.keys(options).length === 0)
  			return null;

  		const CurrentLibrary = options[this.state.selectedIndex]._id;

  		console.log(CurrentLibrary);

		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={3}>
				        <List component="nav" className="p-0">
				          <ListItem
				            button
				            aria-haspopup="true"
				            aria-controls="choice-library"
				            aria-label="Library"
				            onClick={this.handleClickListItem}
				          >
				            <ListItemText
				              primary="Library"
				              secondary={options[this.state.selectedIndex].id}
				            />
				          </ListItem>
				        </List>
				        <Menu
				          id="choice-library"
				          anchorEl={anchorEl}
				          open={Boolean(anchorEl)}
				          onClose={this.handleClose}
				        >
				          {options.map((option, index) => (
				            <MenuItem
				              key={option._id}
				              selected={index === this.state.selectedIndex}
				              onClick={event => this.handleMenuItemClick(event, index)}
				            >
				              {option.id}
				            </MenuItem>
				          ))}
				        </Menu>
				        Arborescence...
					    
					</Grid>
					<Grid item xs={9}>
						Contenu...
					</Grid>
		        </Grid>
		    </div>
		)
	}
	
}

Libraries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Libraries);