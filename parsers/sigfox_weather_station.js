
function parse(data, connector, options) {
    const date = new Date(data.time);
    const hex_array = data.data.match(/.{1,2}/g);

    const temperature = parseInt(hex_array[1] + hex_array[0], 16) / 100;
    const humidity    = parseInt(hex_array[2], 16) / 2;
    const rain        = parseInt(hex_array[3], 16) * 0.2794;
    const wind_speed  = parseInt(hex_array[5] + hex_array[4], 16) / 100;
    const gust_speed  = parseInt(hex_array[7] + hex_array[6], 16) / 100;
    const wind_dir    = parseInt(hex_array[8][0], 16) * 22.5;
    const gust_dir    = parseInt(hex_array[8][1], 16) * 22.5;
    const radiation   = parseInt(hex_array[10] + hex_array[9], 16) / 10;
    const battery_V   = parseInt(hex_array[11], 16) / 100 + 2.5;

    const parsed_data = {
        "timestamp": data.time,
        "temperature": temperature,
        "humidity": humidity,
        "rain": rain,
        "windSpeed": wind_speed,
        "gustSpeed": gust_speed,
        "windDir": wind_dir,
        "gustDir": gust_dir,
        "radiation": radiation,
        "batteryVolt": battery_V
    };

    return parsed_data;
}


module.exports = { parse };
