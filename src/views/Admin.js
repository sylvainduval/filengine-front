import React from "react";
import { Route, Link } from "react-router-dom";

//Tabs
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


//App
import Auth from '../components/Auth';
import Lefter from './Lefter';
import AdminUsers from './AdminUsers';
import AdminGroups from './AdminGroups';
import AdminLibraries from './AdminLibraries';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,

  },
});

const tabs = [
	{
		label: "Users",
		view: "users",
		component: AdminUsers
	},
	{
		label: "Groups",
		view: "groups",
		component: AdminGroups
	},
	{
		label: "Libraries",
		view: "libraries",
		component: AdminLibraries
	}
];
const TabDefault = AdminUsers;
		
function TabList(props) {
	
	const els = props.tabs;
	const match = props.match;
	
	const url = window.location.pathname;
	const currentView = url.substring(url.lastIndexOf('/')  + 1);
	
	let currentTab = 0;
	for (let t in els) {
		if (els[t].view === currentView) {
			currentTab = Number(t);
			break; 
		}
	}

	return (
		<Tabs
			value={currentTab}
			onChange={props.onChange}
			indicatorColor="primary"
			textColor="primary"
			centered
		>
			{els.map((el) =>
				<Tab label={el.label} component={Link} to={`${match.url}/`+el.view} style={{ textDecoration: 'none' }} />
			)}
		</Tabs>
	)
}

const Topic = ({ match }) => {
	for (let t in tabs) {
		if (tabs[t].view === match.params.topicId) {
			const TagName = tabs[t].component;
			return <TagName />
		}
		
	}
	return <TabDefault />
}

class Admin extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			toRefresh: false,
		}

		this.handlerState = this.handlerState.bind(this);
	}
	

	handlerState(param, value) {
		console.log(param, value);
		this.setState({
			[param]: value
		})
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	
	handleChangeIndex = index => {
		this.setState({ value: index });
	};
	


	render() {
		const { classes/*, theme*/ } = this.props;
		const match = this.props.match;

		return (
			<Auth>
				<Lefter pgTitle="Administration" refresher={this.handlerState} />
				<div className={classes.root}>
					<AppBar position="static" color="default">

						<TabList 
							onChange={this.handleChange}
							tabs={tabs} 
							match={match} />

					</AppBar>
					
					<Route path={`${match.url}/:topicId`} component={Topic} />
	
					<Route
						exact
						path={match.url}
						render={() => <TabDefault />}
					/>
				</div>
			</Auth>
		);
	}
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Admin);