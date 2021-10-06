
const connector = require('service-connector');

console.log(Date(Date.now()));
console.log('Service connector started.');

connector.run();
setInterval(connector.run, 10000);
