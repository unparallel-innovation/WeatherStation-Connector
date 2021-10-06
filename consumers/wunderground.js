
const PWS = require('wunderground-pws');


function send(data, connector, options) {
    const pws = new PWS(connector.wunderground_id, connector.wunderground_pass);

    pws.setObservations({
        tempf: ((data.temperature*1.8)+32),             // [F outdoor temperature]
        humidity: data.humidity,                        // [% outdoor humidity 0-100%]
        rainin: data.rain/0.2794*0.011,                 // [rain inches over the past hour)] -- the accumulated rainfall in the past 60 min
        windspeedmph: (data.windSpeed/1.609344),        // [mph instantaneous wind speed]
        windgustmph: (data.gustSpeed/1.609344),         // [mph current wind gust, using software specific time period]
        winddir: data.windDir,                          // [0-360 instantaneous wind direction]
        windgustdir: data.gustDir,                      // [0-360 using software specific time period]
        solarradiation: data.radiation                  // [W/m^2]
    });

    pws.sendObservations(function(error, success) {
        if (error) {
            console.log('Error sending to Weather Underground!');
            console.log(error);
        }
    });

    console.log('Sent to Weather Underground.');
}


module.exports = { send };
