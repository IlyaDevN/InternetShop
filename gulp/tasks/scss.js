import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css" //Compressing CSS file
import autoprefixer from "gulp-autoprefixer"; //Adding of vendor prefixes
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Add media to groups

const sass = gulpSass(dartSass);

export function scss() {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sass())
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowsersList: ["last 3 versions"],
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: app.isDev }))
		.pipe(
			app.plugins.if(
				app.isDev,
				app.plugins.browsersync.stream())
		);
}