// Path
const SRC = 'src',
	DEST = 'dest',
	srcPath = {
		all: `${SRC}/`,
		html: `${SRC}/**/*.html`,
		css: `${SRC}/css/*.css`,
		font: `${SRC}/font/*`,
		js: `${SRC}/js/*.js`,
		img: `${SRC}/images/**/*.{png,jpg,jpeg,gif,svg}`,
		include: `${SRC}/inc/`
	},
	destPath = {
		html: `${DEST}/`,
		css: `${DEST}/css/`,
		font: `${DEST}/font/`,
		js: `${DEST}/js/`,
		img: `${DEST}/images/`,
		include: `${DEST}/inc/`
	}
	destAll = `${DEST}/**/*.*`

module.exports = {
	srcPath,
	destPath,
	destAll
}