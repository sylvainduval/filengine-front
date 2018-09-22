import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({

	formControl: {
		margin: theme.spacing.unit / 2,
	},
  button: {
    margin: theme.spacing.unit,
  },
});


class AdminUser extends React.Component {
	
	constructor(props) {
	    super(props);

		 this.state = {
			open: false,
		};
  	}
  	
	handleClose = () => {
	    	this.setState({ open: false });
	    	this.props.onClose();
	  };

	componentWillReceiveProps(nextProps) {
	  // Typical usage (don't forget to compare props):
	  if (this.props.open !== nextProps.open) {
			this.setState({
				open: nextProps.open
			})
	  }
	}
	
	render() {
		const { classes, userID } = this.props;

		return (
			<Dialog
				open={this.state.open}
	          scroll="paper"
	          aria-labelledby="Edit User"
	          onClose={this.handleClose}
	        >
	          <DialogTitle id="scroll-dialog-title">{userID ? userID : "Add user"}</DialogTitle>
	          <DialogContent>
	            <DialogContentText>
	              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
	              at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
	              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
	              nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
	              et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras
	              mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
	              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
	              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
	              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
	              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
	              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
	              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
	              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
	              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
	              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
	              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
	              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
	              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
	              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
	              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
	              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
	              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
	              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
	              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
	              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
	            </DialogContentText>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleClose} color="primary">
	              Cancel
	            </Button>
	            <Button onClick={this.handleClose} color="primary">
	              Save
	            </Button>
	          </DialogActions>
	        </Dialog>
		);
	}
}

AdminUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUser);