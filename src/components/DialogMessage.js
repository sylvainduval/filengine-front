import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class DialogMessage extends React.Component {

  handleClose = (action) => {
	if (typeof(action) === 'function')
		action.call(this);
	  
    ReactDOM.unmountComponentAtNode(document.getElementById('dialogMessage'));
  };
  

  render() {
	  const { title, description, actions } = this.props;
	  
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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