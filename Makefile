serve:
	npm install
	webpack-dev-server --progress --colors --port 8070 --history-api-fallback
build:
	NODE_ENV=production webpack -p --config webpack.production.config.js