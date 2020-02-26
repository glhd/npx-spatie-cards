const generate_color = (text, color_code) => {
	return `\u001b[${ color_code }m${ text }\u001b[0m`;
};

module.exports = {
	black: text => generate_color(text, 30),
	red: text => generate_color(text, 31),
	green: text => generate_color(text, 32),
	yellow: text => generate_color(text, 33),
	blue: text => generate_color(text, 34),
	magenta: text => generate_color(text, 35),
	cyan: text => generate_color(text, 36),
	white: text => generate_color(text, 37),
};
