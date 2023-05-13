module.exports = function(RED) {
    const debugLength = 1024

    function sendDebug(message) {
        formattedMessage = RED.util.encodeObject({ msg: message }, { maxLength: debugLength });
        RED.comms.publish('debug', formattedMessage);
        console.log('Sent ', message, ' Formatted: ', formattedMessage);
    }

    function DockerfileEndNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                sendDebug(msg.payload.content);
                node.log(msg.payload.content);
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-end', DockerfileEndNode);
}