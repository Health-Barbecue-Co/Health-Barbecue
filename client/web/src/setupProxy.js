const { createProxyMiddleware } = require('http-proxy-middleware');

function onProxyRes(onProxyRes) {
  // add custom header to request
  onProxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
	onProxyRes.headers['Access-Control-Allow-Headers'] = 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
	onProxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';
	onProxyRes.headers['Access-Control-Allow-Origin'] = '*';
}


module.exports = function(app) {
  app.use(
    '/orthanc',
    createProxyMiddleware({
      target: 'http://localhost:8042',
      changeOrigin: true,
			pathRewrite:{
				'^/orthanc': '/'
			},
			onProxyRes
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
			onProxyRes
    })
  );
};
