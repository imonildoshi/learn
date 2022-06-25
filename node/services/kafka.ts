import kafka from 'kafka-node'

class Kafka {
    private static client: any
    private constructor() {}

    static getClient(): any {
        if(Kafka.client) return Kafka.client
        return Kafka.client = new kafka.KafkaClient()
    }
}

export function startKafkaConsumer() {
    console.log('Starting kafka consumer...')
    const client = Kafka.getClient()
    const consumer = new kafka.Consumer(
            client,
            [
                { topic: 'my-topic-1', partition: 0 }
            ],
            {
                autoCommit: true
            }
        );

    consumer.on('message', message => console.log(message));
    consumer.on('error', error => console.error(error));
}

export function startKafkaProducer() {
    console.log('Starting kafka producer...')
    const KeyedMessage = kafka.KeyedMessage
    const client = Kafka.getClient()
    const producer = new kafka.Producer(client)
    const km = new KeyedMessage('key', 'message')

    const payloads = [
        { topic: 'my-topic-1', messages: km, partition: 0 }
    ];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });

    producer.on('error', function (err) {})
}