const readline = require('readline');
const { red, yellow, cyan } = require('./colors.js');

module.exports = function(options) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	
	const pad_size = `${options.length}`.length + 2;
	
	return new Promise(resolvePromise => {
		let prompt_count = 0;
		const resolve = (value) => {
			rl.close();
			readline.moveCursor(process.stdout, 0, -1 * prompt_count);
			readline.cursorTo(process.stdout, 0);
			readline.clearScreenDown(process.stdout);
			return resolvePromise(value);
		};
		
		rl.on('SIGINT', () => {
			resolve(null);
		});
		
		options.forEach((option, index) => {
			const key = `[${yellow(index + 1)}]`.padEnd(pad_size, ' ');
			console.log(`${key} ${cyan(option)}`);
		});
		
		console.log(`\nPress ${red('Ctrl+C')} to cancel`);
		console.log('');
		
		const prompt = () => {
			rl.question('Pick a package: ', (answer) => {
				prompt_count++;
				
				if ('q' === answer.trim().toLowerCase()) {
					return resolve(null);
				}
				
				const index = parseInt(answer.trim()) - 1;
				if (index in options) {
					return resolve(options[index]);
				}
				
				prompt();
			});
		};
		
		prompt();
	});
};
