module.exports = function(RED) {
    function DockerfileWorkdirNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.workdir = config.workdir;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                msg.payload.content = msg.payload.content + 'WORKDIR ' + node.workdir + '\n';
                node.send(msg);
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-workdir', DockerfileWorkdirNode);
}