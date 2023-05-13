module.exports = function(RED) {
    function DockerfileStartNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.baseimage = config.baseimage;
        node.baseimagetag = config.baseimagetag;
        node.baseimagealias = config.baseimagealias;
        node.on('input', function (msg) {
            msg.payload = {
                type: 'dockerfile',
                content: 'FROM ' + node.baseimage + ':' + node.baseimagetag + ' AS ' + node.baseimagealias + '\n',
            };
            node.send(msg);
        });
    }
    RED.nodes.registerType('docker-file-start', DockerfileStartNode);

    RED.httpAdmin.post('/docker-file-start/inject/:id', function (req, res) {
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