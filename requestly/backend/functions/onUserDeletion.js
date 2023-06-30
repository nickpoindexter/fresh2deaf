exports = async function(authEvent) {
  const userCollection = context.services.get("mongodb-atlas").db("requestly").collection("users");

  await userCollection.delete({ "userid": authEvent.user.id })
  .then(result => console.log(`Successfully deleted item with _id: ${result.deletedId}`))
  .catch(err => console.error(`Failed to delete item: ${err}`));
  
  return;
};
