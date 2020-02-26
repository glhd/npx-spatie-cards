#!/usr/bin/env node

const open = require('open');
const confirm = require('./confirm.js');
const prompt = require('./prompt.js');
const banner = require('./banner.js');
const finder = require('./package-finder.js');
const { red, blue } = require('./colors.js');

const abort = () => {
	console.log(red('Cancelled.'));
	console.log('');
	process.exit(1);
};

async function run() {
	banner();
	
	const packages = await finder();
	
	if (null === packages || 0 === packages.length) {
		console.log('No packages found in this directory.');
		if (await confirm('Open spatie.cards in browser?')) {
			open('https://spatie.cards');
		}
		return;
	}
	
	const package_name = await prompt(packages);
	
	if (null === package_name) {
		return abort();
	}
	
	const url = `https://spatie.cards/postcards/create?package=${ encodeURIComponent(package_name) }`;
	console.log(`We'll need to finish at:`);
	console.log(blue(url));
	console.log('');
	
	if (await confirm(`Continue in browser?`)) {
		console.log(`Opening browser...\n`);
		open(url);
		return 0;
	}
	
	return abort();
}

Promise.resolve(run())
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
