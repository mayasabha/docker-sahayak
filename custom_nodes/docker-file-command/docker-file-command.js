module.exports = function(RED) {
    function DockerfileCommandNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.command = config.command;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type !== null && msg.payload.type === 'dockerfile') {
                if (!msg.payload.hasOwnProperty('command') || msg.payload.command === false) {
                    msg.payload.command = true;
                    msg.payload.content = msg.payload.content + 'CMD \"' + node.command + '\"\n';
                    node.send(msg);
                } else {
                    node.error('There can be atmost one Execution Command for each Dockerfile! Please remove any additional Execution Command nodes!', { error: 'There can be atmost one Execution Command for each Dockerfile! Please remove any additional Execution Command nodes!'});
                }
            } else {
                node.error('Incoming Message is not for Dockerfile', { error: 'Incoming Message is not for Dockerfile' });
            }
        });
    }
    RED.nodes.registerType('docker-file-command', DockerfileCommandNode);
}