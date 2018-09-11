let localData;

const session = {
	getParam: function(param) {
		return !localData[param] ? null : localData[param];
	},

	load: function() {
		localData = JSON.parse(localStorage.getItem('session'));
		
		if (localData === null)
			localData = {}

	},

	set: function(data) {
		localStorage.setItem('session', JSON.stringify(data));
		this.load();
	},

	remove: function() {

		localStorage.removeItem('session');
		localData = {}
	}

}

session.load();


export default session;