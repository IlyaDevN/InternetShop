import webpack from "webpack-stream";
import {glob} from "glob";

export function js() {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(webpack({
			mode: app.isBuild ? "production" : "development",
			entry: getEntries(),
			output: {
				filename: "[name].min.js",
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(
			app.plugins.if(
				app.isDev,
				app.plugins.browsersync.stream())
		);
}

function getEntries() {
	const entryArray = glob.sync(app.path.src.js);
	let entries = {};
	entryArray.forEach(function (path) {
		console.log(path);
		let pathParts = path.split("\\");
		console.log(pathParts);
		let fileName = pathParts[pathParts.length - 1].slice(0, -3);
		console.log(fileName);
		entries[fileName] = "./" + path;
	});
	return entries;
}