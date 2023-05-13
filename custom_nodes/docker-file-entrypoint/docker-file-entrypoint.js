module.exports = function(RED) {
    function DockerfileEntrypointNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.entrypoint = config.entrypoint;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                if (!msg.payload.hasOwnProperty('expose') || msg.payload.expose === false) {
                    msg.payload.expose = true;
                    msg.payload.content = msg.payload.content + 'EXPOSE ' + node.port + '\n';
                    node.send(msg);
                } else {
                    node.error('There can be atmost one Entrypoint for each Dockerfile! Please remove any additional Entrypoint nodes!', { error: 'There can be atmost one Entrypoint for each Dockerfile! Please remove any additional Entrypoint nodes!'});
                }
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-entrypoint', DockerfileEntrypointNode);
}