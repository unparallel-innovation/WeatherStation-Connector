
function send(data, connector, options) {
    console.log();
    console.log('----------------------------------------------------------------------');
    console.log(Date(Date.now()));
    console.log('Connector:', connector.id);
    console.log('-------------------- Data --------------------');

    // Find the largest key name for padding
    let length = 0;
    for (const [key, value] of Object.entries(data)) {
        if (key.length >= length) {
            length = key.length + 1;
        }
    }

    for (const [key, value] of Object.entries(data)) {
        console.log((key+':').padEnd(length), value);
    }

    console.log('----------------------------------------------');
}


module.exports = { send };
