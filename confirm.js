const readline = require('readline');

module.exports = function(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	
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
			resolve(false);
		});
		
		const prompt = () => {
			rl.question(`${question} [y/n]: `, (answer) => {
				prompt_count++;
				
				if ('y' === answer.trim().substr(0, 1).toLowerCase()) {
					return resolve(true);
				}
				
				if ('n' === answer.trim().substr(0, 1).toLowerCase()) {
					return resolve(false);
				}
				
				prompt();
			});
		};
		
		prompt();
	});
};
