var mqttServer = require('mqtt');
var mqttClient = mqttServer.connect(process.env.MQTT_URL);

mqttClient.on('connect', function () {
    mqttClient.subscribe(process.env.MQTT_TOPIC);
    console.log('client has successfully connected');
});

mqttClient.on('message', function (topic, message) {
    console.log(message.toString());
});