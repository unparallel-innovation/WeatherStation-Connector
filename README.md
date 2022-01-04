
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# WeatherStation Connector

<p align="center">
    <img src="https://user-images.githubusercontent.com/20951805/137321564-7b948da6-5f59-482f-b4c2-27412b858842.png" alt="Service Connector logo" height="220px"/>
    <img src="https://user-images.githubusercontent.com/20951805/137320834-c8f65e69-9aa8-45b7-9652-c359fd8cfd78.png" alt="WeatherStation Connector logo" height="210px"/>
</p>

The WeatherStation Connector was made using the [service-connector](https://www.npmjs.com/package/service-connector) npm package that allows to easily create a service to connect different data sources, clouds, databases, APIs, files, etc.

The service-connector is configured to periodically request data from Sigfox, that was sent from one of the weather stations defined in the configuration file. The Sigfox message is then decoded into weather data that is printed to the console and posted to MQTT and [Weather Underground](https://www.wunderground.com).

For more information about the Unparallel Weather Station check the [Related Repositories](#related-repositories) and [Iot-Catalogue](https://www.iot-catalogue.com/search/component/60704f126dc1142086fa54f6).


## Quick Start
Clone this repo and edit the Sigfox and Wunderground credentials in [config.json](config.json).

You can also change the MQTT broker configuration and add more weather stations to the configuration file if desired.

Run the WeatherStation Connector with:
```
node start.js
```
or
```
./start.sh
```


## Docker
Use the included Dockerfile to create a docker image and run it.
```
docker build -t weather-station-connector . --no-cache
docker run -d weather-station-connector
```
Check if the container if running and see the output.
```
docker ps
docker logs <CONTAINER-ID>
```
To stop the container use:
```
docker stop <CONTAINER-ID>
```


### docker-compose
Use the included docker-compose.yml to run with docker-compose.
```
docker-compose -f docker-compose.yml up -d
```
Check if the container if running and see the output.
```
docker ps
docker logs <CONTAINER-ID>
```
Stop the WeatherStation Connector with:
```
docker-compose -f docker-compose.yml down
```


### docker stack
Use the included docker-compose.yml to create a docker stack.
```
docker stack deploy -c docker-compose.yml weather-station-connector
```
Check if the container if running and see the output.
```
docker stack ls
docker ps
docker logs <CONTAINER-ID>
```
Stop the WeatherStation Connector stack with:
```
docker stack rm weather-station-connector
```


## Related Repositories:
*  [Unparallel WeatherStation PCB](https://github.com/unparallel-innovation/WeatherStation-PCB)
*  [Unparallel WeatherStation Enclosure](https://github.com/unparallel-innovation/WeatherStation-Enclosure)
*  [Unparallel WeatherStation Documentation](https://github.com/unparallel-innovation/WeatherStation-Documentation)
*  [Unparallel WeatherStation Software](https://github.com/unparallel-innovation/WeatherStation-Software)
*  [Service-Connector-Core](https://github.com/unparallel-innovation/Service-Connector-Core)
*  [Service-Connector-Template](https://github.com/unparallel-innovation/Service-Connector-Template)



## Getting Support
If you'd like to report a bug or a missing feature, please use [GitHub issue tracker](https://github.com/unparallel-innovation/WeatherStation-Connector/issues).


## License
This software is free and is distributed under the [MIT License](https://opensource.org/licenses/MIT).

___

###### This work was done in the context of SmartAgriHubs Research Project, which has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 818182
