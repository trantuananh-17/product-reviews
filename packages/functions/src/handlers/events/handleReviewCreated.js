export async function handleReviewCreated(event) {
  const snapshot = event.data;

  if (!snapshot) {
    console.log('No data associated with the event');
    return;
  }

  const data = snapshot.data();

  console.log('data', data);

  const {productId, rate} = data;

  console.log('productId:', productId);
  console.log('rate:', rate);
}
