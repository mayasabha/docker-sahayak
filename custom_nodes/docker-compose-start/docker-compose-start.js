module.exports = function(RED) {
    function DockerComposeStartNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.version = config.version;
        node.on('input', function (msg) {
            msg.payload = {
                type: 'docker-compose',
                compose: {
                    version: node.version,
                    services: [],
                    networks: [],
                },
            };
            node.send(msg);
        });
    }
    RED.nodes.registerType('docker-compose-start', DockerComposeStartNode);

    RED.httpAdmin.post('/docker-compose-start/inject/:id', function (req, res) {
        var node = RED.nodes.getNode(req.params.id);
        if (node !== null) {
            try {
                node.receive();
                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(500);
                node.error(RED._('inject.failed', { error: err.toString() }));
            }
        } else {
            res.sendStatus(404);
        }
    })
}