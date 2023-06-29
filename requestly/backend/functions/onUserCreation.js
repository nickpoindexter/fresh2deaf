exports = async (user) => {
  const userCollection = context.services.get("mongodb-atlas").db("requestly").collection("users");

  await userCollection.insertOne({ "userid": user.id, name: user.data.name, email: user.data.email })
  .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  .catch(err => console.error(`Failed to insert item: ${err}`));
  
  return;
};
