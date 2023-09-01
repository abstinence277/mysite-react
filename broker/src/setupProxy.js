const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/dealer', {
    target: 'http://localhost:8000',
    changeOrigin: true
  }))
};