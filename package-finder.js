const fs = require('fs');

module.exports = () => new Promise(resolve => {
	fs.readFile('composer.json', function(err, contents) {
		if (err) {
			resolve(null);
		}
		
		let data = {};
		try {
			data = JSON.parse(contents);
		} catch (e) {
			return resolve(null);
		}
		
		const packages = [];
		
		if ('require' in data) {
			Object.keys(data['require']).forEach(function(package_name) {
				if (package_name.startsWith('spatie/')) {
					packages.push(package_name);
				}
			});
		}
		
		if ('require-dev' in data) {
			Object.keys(data['require-dev']).forEach(function(package_name) {
				if (package_name.startsWith('spatie/')) {
					packages.push(package_name);
				}
			});
		}
		
		resolve(packages);
	});
});
