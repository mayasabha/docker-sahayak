module.exports = function(RED) {
    function DockerComposeServiceNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.ports = config.ports;
        node.container_name = config.container_name;
        node.image = config.image;
        node.build_context = config.build_context;
        node.build_dockerfile = config.build_dockerfile;
        node.networks = config.networks;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'docker-compose') {
                msg.payload.compose.services.push({ name: node.name, ports: node.ports.split(','), container_name: node.container_name, image: node.image, build: { context: node.build_context, dockerfile: node.build_dockerfile, }, networks: node.networks.split(',') });
                node.send(msg);
            } else {
                node.error('Incoming Message is not for Docker Compose', { error: 'Incoming Message is not for Docker Compose' });
            }
        });
    }
    RED.nodes.registerType('docker-compose-service', DockerComposeServiceNode);
}