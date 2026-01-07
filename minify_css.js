//Ejecutar: node minify_css.js

const fs = require("fs");
const CleanCSS = require("clean-css");
const path = require("path");

const inputFile = path.join(__dirname, "css", "style.css");
const outputFile = path.join(__dirname, "css", "style.min.css");

console.log(`Minifying ${inputFile} to ${outputFile}...`);

fs.readFile(inputFile, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		process.exit(1);
	}

	const options = {
		level: 2, // Aggressive merging
		compatibility: "*",
	};

	const output = new CleanCSS(options).minify(data);

	if (output.errors.length > 0) {
		console.error("Errors minifying CSS:", output.errors);
		process.exit(1);
	}

	if (output.warnings.length > 0) {
		console.warn("Warnings:", output.warnings);
	}

	fs.writeFile(outputFile, output.styles, (err) => {
		if (err) {
			console.error("Error writing file:", err);
			process.exit(1);
		}

		const savings = (
			((data.length - output.styles.length) / data.length) *
			100
		).toFixed(2);
		console.log("--------------------------------------------------");
		console.log("CSS Minification Complete!");
		console.log(`Original Size: ${(data.length / 1024).toFixed(2)} KB`);
		console.log(
			`Minified Size: ${(output.styles.length / 1024).toFixed(2)} KB`
		);
		console.log(`Saved: ${savings}%`);
		console.log("--------------------------------------------------");
	});
});
