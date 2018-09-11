import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/core/Icon';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

//icons
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Comment from '@material-ui/icons/Comment';
import Menu from '@material-ui/icons/Menu';
//-----

import AuthDisconnect from '../components/AuthDisconnect';

import {Link} from "react-router-dom";
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
  list: {
    width: 250,
  },
};

const LefterListItem = (props, context) => {
  const style = {
    textDecoration: 'none'
  }

  return <Link to={props.href} style={style}>
            <ListItem button>
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItem>
          </Link>
}

class Lefter extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>

        <List  component="nav">
          <LefterListItem icon={<Home />} href="/" label="Home" />
          <LefterListItem icon={<AccountCircle />} href="/preferences" label="My account" />
          <LefterListItem icon={<Comment />} href="/topics" label="Topics" />
        </List>

        <Divider />

        <List>
          <AuthDisconnect refresher={this.props.refresher} />
        </List>
      </div>
    );

    return (
      <div  className="border-bottom">
        <Grid container spacing={0}>
          <Grid item xs={1}>

            <Button  onClick={this.toggleDrawer('left', true)}>
              <Icon>
                <Menu />
              </Icon>
            </Button>

          </Grid>
          <Grid item xs>
            <Typography 
              className="ml-3 mt-2"               
              variant="title">
                {this.props.pgTitle}
            </Typography>
          </Grid>
          
          <Grid item xs>
            <Typography 
              className="mr-3 mt-1 text-right" 
              variant="headline">
                filengine
            </Typography>
          </Grid>
        </Grid>

        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Lefter);