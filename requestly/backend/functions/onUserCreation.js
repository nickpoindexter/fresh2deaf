/*
  This function will run after a user is created and is called with an object representing that user.

  This function runs as a System user and has full access to Services, Functions, and MongoDB Data.

  Example below:

  exports = ({ user }) => {
    // use collection that Custom User Data is configured on
    const collection = context.services.get("<SERVICE_NAME>").db("<DB_NAME>").collection("<COLL_NAME>");

    // insert custom data into collection, using the user id field that Custom User Data is configured on
    const doc = collection.insertOne({ <USER_ID_FIELD>: user.id, name: user.data.name });
  };
*/

exports = async (user) => {
  const userCollection = context.services.get("mongodb-atlas").db("requestly").collection("users");

  await userCollection.insertOne({ "userid": user.id, name: user.data.name, email: user.data.email })
  .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  .catch(err => console.error(`Failed to insert item: ${err}`));
  
  const newUser = userCollection.findOne({"userid":user.id});
  return {newUser};
};
