exports = async function(authEvent) {
  const userCollection = context.services.get("mongodb-atlas").db("requestly").collection("users");

  await userCollection.deleteOne({ "userid": authEvent.user.id })
  .then(result => console.log(`Deleted ${result.deletedCount} item.`))
  .catch(err => console.error(`Delete failed with error: ${err}`))
  
  return;
};
