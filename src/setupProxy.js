const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        // previously was written as "/api"
        ["/api/*", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};