import { createProxyMiddleware } from 'http-proxy-middleware'

function onProxyRes(onProxyRes: any) {
  // add custom header to request
  onProxyRes.headers['Access-Control-Allow-Credentials'] = 'true'
	onProxyRes.headers['Access-Control-Allow-Headers'] = 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'
	onProxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
	onProxyRes.headers['Access-Control-Allow-Origin'] = '*'
}


export default app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8042',
      changeOrigin: true,
			pathRewrite:{
				'^/api': '/'
			},
			onProxyRes
    })
  );
}
