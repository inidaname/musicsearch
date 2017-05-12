const wifiPassword = require('wifi-password');

wifiPassword().then(password => {
	console.log(password);
	//=> 'johndoesecretpassword'
});
