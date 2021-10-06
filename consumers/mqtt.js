
const path = require('path');
const mqtt = require('mqtt');


function send(data, connector, options) {
    const topic = path.join(options.mqtt_topic, connector.id)

    const mqtt_config = {
        'clientId': connector.id,
        'host': options.mqtt_url,
        'port': options.mqtt_port,
        'username': options.mqtt_username,
        'password': options.mqtt_password
    };

    const client = mqtt.connect(options.mqtt_url, mqtt_config);

    for (const [key, value] of Object.entries(data)) {
        client.publish(path.join(topic, key), value.toString(), { qos: options.mqtt_qos });
    }

    console.log('Sent to MQTT.');
}


module.exports = { send };
