import React from "react";
import { Route, Link } from "react-router-dom";

import Auth from '../components/Auth';
import Lefter from './Lefter';


class Topics extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			toRefresh: false
		}
		
		this.handlerState = this.handlerState.bind(this)
	}
	
	handlerState(param, value) {
		console.log(param, value);
		this.setState({
			[param]: value
		})
	}

	render() {
		const match = this.props.match;

		return(
			<div>
				
			<Auth>
				<Lefter pgTitle="Topics" refresher={this.handlerState} />
				<p>ici la page des topics</p>
				<ul>
				  <li>
				    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
				  </li>
				  <li>
				    <Link to={`${match.url}/components`}>Components</Link>
				  </li>
				  <li>
				    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
				  </li>
				</ul>
				
				<Route path={`${match.url}/:topicId`} component={Topic} />
				<Route
				  exact
				  path={match.url}
				  render={() => <h3>Please select a topic.</h3>}
				/>
			  </Auth>
			</div>
			)
	}

}

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default Topics;