const express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon');
	let musicsearch = express();
	musicsearch.use(express.static("app"));
	//instantiaiting the app here

    let searchRoute = express.Router(); //route for the web app
    

	//pointing the route to the search system
	searchRoute.route('/search').post(function (req, res) {
		return console.log(req.body)
	})

	musicsearch.use('/', searchRoute).listen(8888);
