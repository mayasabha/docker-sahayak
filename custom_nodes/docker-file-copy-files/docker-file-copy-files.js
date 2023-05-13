module.exports = function(RED) {
    function DockerfileCopyFilesNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.from = config.from;
        node.to = config.to;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                msg.payload.content = msg.payload.content + 'COPY ' + node.from + ' ' + node.to + '\n';
                node.send(msg);
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-copy-files', DockerfileCopyFilesNode);
}