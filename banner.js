const { red, white, blue } = require('./colors.js');

const airmail_top = `${red('_')}${white('_')}${blue('_')}`.repeat(5) + red('_');
const airmail_bottom = `${red('‾')}${white('‾')}${blue('‾')}`.repeat(5) + red('‾');

module.exports = () => {
	console.log(``);
	console.log(` ${airmail_top} `);
	console.log(`|                |`);
	console.log(`| To:            |`);
	console.log(`|  __            |`);
	console.log(`| (_._ __|_ o _  |`);
	console.log(`| __|_(_||_ |(/_ |`);
	console.log(`|   |            |`);
	console.log(`|                |`);
	console.log(` ${airmail_bottom} `);
	console.log(``);
};
