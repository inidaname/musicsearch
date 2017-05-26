const express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon'),
	bcrypt = require('bcrypt'),
	md5 = require('md5'),
	nodemailer = require('nodemailer'),
	hbs = require('nodemailer-express-handlebars'),
	moment = require('moment'),
	cookieParser = require('cookie-parser');

	let musicsearch = express();
	musicsearch.use(express.static("app")).use(bodyParser.json());

	//This options sends mail
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'saniyhassan@gmail.com',
			pass: 'tillirise'
		}
	});

	//useing engine for mail view
	transporter.use('compile', hbs({
		viewPath: 'app/views/email',
		extName: '.hbs'
	}));

	//using cryto to generate random number for authentication
	random = (howMany, chars) => {
	    chars = chars
	        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
	    let rnd = crypto.randomBytes(howMany),
		 		value = new Array(howMany),
				len = chars.length;

	    for (let i = 0; i < howMany; i++) {
	        value[i] = chars[rnd[i] % len]
	    };

	    return value.join('');
	}

	//instantiaiting the app here

	let searchRoute = express.Router(); //route for the web app

	//pointing the route to the search system
	searchRoute.route('/search').post(function (req, res) {
		return console.log(req.body)
	})

	musicsearch.use('/', searchRoute).listen(8888);
