import React from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import session from "./session";

import ReturnMessage from '../components/ReturnMessage';

const BASE_URL = "http://vps532725.ovh.net:3000";




axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



const api = {
	
	
	request: function(params, callbackSuccess, callbackError) {
		
		//const session = JSON.parse(localStorage.getItem('session'));
		
		if (session.getParam("token") !== null)
			axios.defaults.headers.common['x-access-token'] = session.getParam("token");
		
		params.timeout = 10000;
		
		params.url = BASE_URL + params.url;
		
		//Ré-initialisation du message de retour
		ReactDOM.unmountComponentAtNode(document.getElementById('returnMessage'));
		
		axios(params)
			.then(response => {
			    // handle success
			    if (typeof(callbackSuccess) === 'function') {
				    
			        callbackSuccess.call(this, response.data, response.status);
		        }
			  })
			  .catch(error => {

			  	let msg = null;
			    // handle error
			    if (error.response.data.error) {
				    let e = error.response.data.error;
				    
				    if (e !== undefined && e !== null && e.constructor === Object)
						msg = JSON.stringify(error.response.data.error);
					else
						msg = e;
			    }


			    if (msg !== null) {
			    
				    ReactDOM.render(
						<ReturnMessage variant="error" message={msg} />,
						document.getElementById('returnMessage')
					);

				 }

				if (error.response.status === 401) {
					session.remove();
				}
				
			    	
			    if (typeof(callbackError) === 'function') {
			        callbackError.call(this, error.response.data, error.response.status);
		        }	
			    	
			});
	
	}
}


//module.exports = api;

export default api;