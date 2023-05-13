module.exports = function(RED) {
    function DockerComposeNetworkNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.external = config.external;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'docker-compose') {
                msg.payload.compose.networks.push({ name: node.name, external: node.external });
                node.send(msg);
            } else {
                node.error('Incoming Message is not for Docker Compose', { error: 'Incoming Message is not for Docker Compose' });
            }
        });
    }
    RED.nodes.registerType('docker-compose-network', DockerComposeNetworkNode);
}