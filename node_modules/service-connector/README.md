
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# Service Connector Core

<p align="center">
  <img src="https://user-images.githubusercontent.com/20951805/137320834-c8f65e69-9aa8-45b7-9652-c359fd8cfd78.png" alt="Service Connector logo" height="250px"/>
</p>

The [service-connector](https://www.npmjs.com/package/service-connector) is a npm package that allows to easily create a service to connect different clouds, databases, APIs, services, and others.

It uses a simple structure of providers, parsers and consumers to connect different services. The service connector has a list of connecters that each has one provider, one parser and one or several consumers. Each connector can also have specific options that are passed as arguments to the providers, parsers and consumers.



## Providers
Providers get data from any cloud, service, API or other data source and are the inputs of the Service Connector.

A provider must implement the function **get(connector, options) {}** which receives as arguments the current connector options and provider options from config.json. The function should return the data as an Array of objects or an empty Array if there is no data to return. A provider must export the function get so it can be called by the Service Connector.

Example provider that returns one random number.
```
function get(connector, options) {
    const data = [{"randomNumber": Math.random()}];
    return data;
}

module.exports = { get };
```
This provider is included in the [Service-Connector-Template/providers/random.js](https://github.com/unparallel-innovation/Service-Connector-Template/blob/main/providers/random.js).



## Parsers
Parsers convert the raw data that is received from providers and manipulate it to have a data structure that is usable by the consumers.

A parser must implement the function **parse(data, connector, options) {}** which receives as arguments one object of data, the current connector options and parser options from config.json. The function should return the data as an object {"key":"value"} or an empty object {} if there is no data to return. A parser must export the function parse so it can be called by the Service Connector.

Example parser that gets a number from the random provider above and multiplies it by 100.
```
function parse(data, connector, options) {
    const parsed_data = [{"randomNumberx100": (data.randomNumber * 100)}];
    return parsed_data;
}

module.exports = { parse };
```

If the data from the provider does not need any parsing, a passthrough can be used, which simply returns the same data object that was received.
```
function parse(data, connector, options) {
    return data;
}

module.exports = { parse };
```
This parser is included in the [Service-Connector-Template/parsers/passthrough.js](https://github.com/unparallel-innovation/Service-Connector-Template/blob/main/parsers/passthrough.js).



## Consumers
Consumers get data from parsers and send it to any cloud, service, API, console, text file or any other data consumer, they are the outputs of the Service Connector.

A consumer must implement the function **send(data, connector, options) {}** which receives as arguments one object of data, the current connector options and consumer options from config.json. This function should not return anything. A consumer must export the function send so it can be called by the Service Connector.

Example consumer that prints to the console the key and value for each element in the data object.
```

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
```
This consumer is included in the [Service-Connector-Template/consumers/console.js](https://github.com/unparallel-innovation/Service-Connector-Template/blob/main/consumers/console.js).



## Quick Start
Use the [Service-Connector-Template](https://github.com/unparallel-innovation/Service-Connector-Template) to quickly start using the Service Connector.

It already comes with all the files needed and a working example to help you get started.



## Manual installation
Create a directory for your project or application.

Install service-connector with npm.
```
npm install service-connector
```

Create the required directory structure and files for providers, parsers and consumers.
```
.
├── config.json
├── consumers
│   ├── example_consumer1.js
├── node_modules
│   ├── require-dir
│   ├── service-connector
│   └── ...
├── package-lock.json
└── package.json
├── parsers
│   ├── example_parser1.js
├── providers
│   ├── example_provider1.js
└── start.js
```

#### Configuration file - config.json
The configuration file is based on **connectors** that make the connection between consumers, parsers and providers. Each connector only has one provider and one parser but can have multiple consumers. Each connector, provider, parser and consumer can have more options defined in config.json they will be passed as arguments to the respective modules.

Example config.json with a minimal configuration:
```
{
    "connectors": [
        {
            "enabled": true,
            "id": "Service-Connector-Example",
            "provider": "example_provider",
            "parser": "example_parser",
            "consumers": ["example_consumer"]
        }
    ],

    "providers": {
        "example_provider": {
            "enabled": true,
            "file": "example_provider1.js"
        }
    },

    "parsers": {
        "example_parser": {
            "file": "example_parser1.js"
        }
    },

    "consumers": {
        "example_consumer": {
            "enabled": true,
            "file": "example_consumer1.js"
        }
    }
}
```

#### Main file - start.js
The main file can be as simple as setting an interval for connector.run to be called periodically.
```
const connector = require('service-connector');
setInterval(connector.run, 10000);
```

Run the Service Connector with:
```
node start.js
```


## Docker
Please refer to [Service-Connector-Template](https://github.com/unparallel-innovation/Service-Connector-Template) for documentation and examples on how to use with docker.


## Related Repositories:
*  [Service-Connector-Template](https://github.com/unparallel-innovation/Service-Connector-Template)


## Getting Support
If you'd like to report a bug or a missing feature, please use [GitHub issue tracker](https://github.com/unparallel-innovation/Service-Connector-Core/issues).


## License
This software is free and is distributed under the [MIT License](https://opensource.org/licenses/MIT).
