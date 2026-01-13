import {PubSub} from '@google-cloud/pubsub';

const pubsub = new PubSub();

export async function publishMessage(topicName, payload) {
  return pubsub.topic(topicName).publishMessage({
    data: Buffer.from(JSON.stringify(payload))
  });
}
