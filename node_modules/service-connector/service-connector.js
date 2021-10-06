
const path = require('path');
const requireDir = require('require-dir');

const dirname = path.dirname(require.main.filename)
const providers = requireDir(path.join(dirname, 'providers'));
const parsers = requireDir(path.join(dirname, 'parsers'));
const consumers = requireDir(path.join(dirname, 'consumers'));
const config = require(path.join(dirname, 'config.json'));


async function run() {
    for (const connector of config.connectors) {
        if ( connector.enabled ) {
            const provider_options = config.providers[connector.provider]

            if ( provider_options.enabled ) {
                const provider = providers[path.basename(provider_options.file, '.js')]
                data = await provider.get(connector, provider_options);

                if (data && data.length > 0) {
                    for (const item of data) {
                        const parser_options = config.parsers[connector.parser]
                        const parser = parsers[path.basename(parser_options.file, '.js')]
                        parsed_data = await parser.parse(item, connector, parser_options);

                        connector.consumers.forEach(consumer_name => {
                            const consumer_options = config.consumers[consumer_name];

                            if ( consumer_options.enabled ) {
                                const consumer = consumers[path.basename(consumer_options.file, '.js')]
                                consumer.send(parsed_data, connector, consumer_options);
                            }
                        });
                    }
                }
            }
        }
    }
}


module.exports = { run };
