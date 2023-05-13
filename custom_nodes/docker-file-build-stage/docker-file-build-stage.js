module.exports = function(RED) {
    function DockerfileBuildStageNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.source = config.source;
        node.tag = config.tag;
        node.alias = config.alias;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                msg.payload.content = msg.payload.content + 'FROM ' + node.source + ((node.tag) ? ':' + node.tag : '') + ((node.alias) ? ' AS ' + node.alias : '') + '\n';
                node.send(msg);
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-build-stage', DockerfileBuildStageNode);
}