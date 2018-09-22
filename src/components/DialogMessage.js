import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class DialogMessage extends React.Component {
	
	state = {
		open: false,
	};
	
	handleClose = () => {
	    	this.setState({ open: false });
	    	this.props.onClose();
	  };
	

  handleClose = (action) => {
	  this.setState({ open: false });
	  this.props.onClose();
	  
	if (typeof(action) === 'function')
		action.call(this);
	  
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
	  const { title, description, actions } = this.props;
	  
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby={title}
          aria-describedby={description}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          	{actions.map(a =>
				<Button key={a.label} onClick={() => {this.handleClose(a.onClick)}} color="primary" autoFocus={!!a.autoFocus}>
	             	{a.label}
	            </Button>
				)}
          

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogMessage;