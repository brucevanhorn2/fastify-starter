import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "fastify-app",
  brokers: ["localhost:9092"], // Change to your Kafka broker(s)
});

const consumer = kafka.consumer({ groupId: "fastify-consumer-group" });

async function connectKafkaConsumer(topic: string) {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  return consumer;
}

export { consumer, connectKafkaConsumer };
