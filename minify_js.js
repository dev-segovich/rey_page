//Ejecutar: node minify_js.js

const fs = require("fs");
const Terser = require("terser");

const code = fs.readFileSync("js/script.js", "utf8");

Terser.minify(code, {
	compress: {
		dead_code: true,
		drop_console: true,
		drop_debugger: true,
		keep_fnames: false,
		toplevel: true,
		passes: 2,
	},
	mangle: {
		toplevel: true,
	},
}).then((result) => {
	if (result.error) {
		console.error("Error minifying:", result.error);
	} else {
		fs.writeFileSync("js/script.min.js", result.code);
		console.log("Successfully minified js/script.js to js/script.min.js");
	}
});
