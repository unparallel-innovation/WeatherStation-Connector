
const got = require('got');


async function get(connector, options) {
    try {
        if (!connector.since) {
            connector.since = Date.now();
        }

        const headers = {"Authorization": "Basic " + Buffer.from(options.sigfox_user+':' + options.sigfox_pass).toString("base64")};
        const url = 'https://api.sigfox.com/v2/devices/' + connector.sigfox_id + '/messages?since=' + connector.since;

        const response = await got(url, {headers});

        if (response.statusCode == 200) {
            const obj = JSON.parse(response.body);

            if (obj.data.length > 0) {
                for (const data of obj.data) {
                    if(connector.since < data.time) {
                        connector.since = data.time + 1;
                    }
                }
            }
            return obj.data;

        } else {
            console.log('----------------------------------------------------------------------');
            console.log(Date(Date.now()));
            console.log('Connector:', connector.id);
            console.log('Sigfox request failed! Code:', response.statusCode);
            console.log(response.body);
        }
    } catch (error) {
        console.log('----------------------------------------------------------------------');
        console.log(Date(Date.now()));
        console.log('Connector:', connector.id);
        console.log('Sigfox request error! Code:', error.response.statusCode);
        console.log(error.response.body);
    }
}


module.exports = { get };
