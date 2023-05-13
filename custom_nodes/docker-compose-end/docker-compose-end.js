module.exports = function(RED) {
    const debugLength = 1024

    function sendDebug(message) {
        formattedMessage = RED.util.encodeObject({ msg: message }, { maxLength: debugLength });
        RED.comms.publish('debug', formattedMessage);
    }

    function generateDockerComposeFile(compose) {
        let result = '';
        result = result + 'version: \"' + compose.version + '\"\n\n';

        if (compose.services.length > 0) {
            result = result + 'services:\n';
            for (const serviceIndex in compose.services) {
                const service = compose.services[serviceIndex];
                if (service.hasOwnProperty('name') && service.name !== null) {
                    result = result + '\t' + service.name + ':\n';
                }
                if (service.hasOwnProperty('container_name') && service.container_name !== null) {
                    result = result + '\t\tcontainer_name: ' + service.container_name + '\n';
                }
                if (service.hasOwnProperty('ports') && service.ports.length > 0) {
                    result = result + '\t\tports:\n';
                    for (const portIndex in service.ports) {
                        result = result + '\t\t\t- ' + service.ports[portIndex] + '\n';
                    }
                }
                if (service.hasOwnProperty('image') && service.image !== null) {
                    result = result + '\t\timage: ' + service.image + '\n';
                }
                if (service.hasOwnProperty('build')) {
                    result = result + '\t\tbuild:\n';
                    if (service.build.hasOwnProperty('context') && service.build.context !== null) {
                        result = result + '\t\t\tcontext: ' + service.build.context + '\n';
                    }
                    if (service.build.hasOwnProperty('dockerfile') && service.build.dockerfile !== null) {
                        result = result + '\t\t\tdockerfile: ' + service.build.dockerfile + '\n';
                    }
                }
                if (service.hasOwnProperty('networks') && service.networks.length > 0) {
                    result = result + '\t\tnetworks:\n';
                    for (const networkIndex in service.networks) {
                        result = result + '\t\t\t- ' + service.networks[networkIndex] + '\n';
                    }
                }
            }
            result = result + '\n';
        }

        if (compose.networks.length > 0) {
            result = result + 'networks:\n';
            for (const networkIndex in compose.networks) {
                const network = compose.networks[networkIndex];
                if (network.hasOwnProperty('name') && network.name !== null) {
                    result = result + '\t' + network.name + ':\n';
                    if (network.hasOwnProperty('external') && network.external === 'yes') {
                        result = result + '\t\texternal: ' + true + '\n';
                    } else {
                        result = result + '\t\tname: ' + network.name + '\n';
                    }
                }
            }
            result = result + '\n'
        }

        return result;
    }

    function DockerComposeEndNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            if (msg !== null && msg.payload !== undefined && msg.payload.hasOwnProperty('type') && msg.payload.type === 'docker-compose') {
                const dockerComposeFile = generateDockerComposeFile(msg.payload.compose);
                sendDebug(dockerComposeFile);
                node.log(dockerComposeFile);
            } else {
                node.error('Incoming Message is not for Docker Compose', { error: 'Incoming Message is not for Docker Compose' });
            }
        });
    }
    RED.nodes.registerType('docker-compose-end', DockerComposeEndNode);
}