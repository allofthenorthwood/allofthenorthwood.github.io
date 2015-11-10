This is my blog
================

I made it. It has words. And pictures. Mostly pictures.


If for some reason you wanted to run it locally, you could run:

```
npm install
webpack-dev-server --progress --colors --port 8070 --history-api-fallback
```
then go to
```
http://localhost:8070
```

but that would be odd!

For building production:
```
NODE_ENV=production webpack -p --config webpack.production.config.js
```
Okay I admit it, this is just for my own reference.