#!/usr/bin/env node

var fs = require('fs');
var open = require('open');

console.log('Looking for composer.json...');

function fallback() {
	open('https://spatie.cards');
}

fs.readFile('composer.json', function(err, data) {
	if (err) {
		console.warn(`Couldn't find a composer.json file. Redirecting to web…`);
		return fallback();
	}
	
	try {
		var composer_json = JSON.parse(data);
	} catch (e) {
		console.warn(`Couldn't parse composer.json file. Redirecting to web…`);
		return fallback();
	}
	
	var package_count = 0;
	
	if ('require' in composer_json) {
		Object.keys(composer_json['require']).forEach(function(package_name) {
			if (package_name.startsWith('spatie/')) {
				package_count++;
				open('https://spatie.cards?package=' + encodeURIComponent(package_name));
			}
		});
	}
	
	if ('require-dev' in composer_json) {
		Object.keys(composer_json['require-dev']).forEach(function(package_name) {
			if (package_name.startsWith('spatie/')) {
				package_count++;
				open('https://spatie.cards?package=' + encodeURIComponent(package_name));
			}
		});
	}
	
	if (0 === package_count) {
		console.warn(`No Spatie packages found…`);
		return fallback();
	}
});
