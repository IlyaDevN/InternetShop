import versionNumber from "gulp-version-number";
import nunjucks from "gulp-nunjucks"

export function html() {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(nunjucks.compile())
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					"value": "%DT%",
					"append": {
						"key": "_v",
						"cover": 0,
						"to": [
							"css",
							"js"
						] 
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(
			app.plugins.if(
				app.isDev,
				app.plugins.browsersync.stream())
		);
}