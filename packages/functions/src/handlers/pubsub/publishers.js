import {PubSub} from '@google-cloud/pubsub';

const pubsub = new PubSub();

export async function publishCreateMetafield(payload) {
  return pubsub.topic('create-metafield-product').publishMessage({
    data: Buffer.from(JSON.stringify(payload))
  });
}
