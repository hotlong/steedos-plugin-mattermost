var server = require('@steedos/meteor-bundle-runner');
var objectql = require("@steedos/objectql")
var path = require('path');
server.Fiber(function () {
    server.Profile.run("Server startup", function () {
        server.loadServerBundles();
        try {
            var steedosSchema = objectql.getSteedosSchema()
            // steedosSchema.addDataSource('mattermost', {
            //     driver: "postgres",
            //     url: "postgresql://mmuser:mmuser_password@192.168.0.21:5432/mattermost",
            //     objectFiles: [path.resolve(__dirname, "./src")],
            //     appFiles: [path.resolve(__dirname, "./src")]
            // });
            steedosSchema.getDataSource('mattermost').init();
        } catch (error) {
            console.log(error)
        }
        server.callStartupHooks();
        server.runMain();
    });
}).run();