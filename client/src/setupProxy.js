const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        ["/api/**", "/api/surveys/", "/auth/google"],
        createProxyMiddleware({
            // 404. That’s an error. The requested URL /localhost:3000/api/surveys/thanks was not found on this server.
            target: "http://localhost:5000",
        })
    );
};