const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Handle errors gracefully to prevent the server from crashing
proxy.on('error', function (err, req, res) {
res.writeHead(500, {
'Content-Type': 'text/plain'
});
res.end('Something went wrong with the proxy request.');
});

// Create a standard HTTP server that listens for incoming requests
const server = http.createServer(function(req, res) {
// Define the target website you want to fetch data from
const target =  'https://wikipedia.org';

console.log(`Proxying request for: ${req.url} -> Target: ${target}`);

// Forward the request and response objects to the target destination
proxy.web(req, res, {
target: target,
changeOrigin: true
});
});

// Start the server using Render's automatic port environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

