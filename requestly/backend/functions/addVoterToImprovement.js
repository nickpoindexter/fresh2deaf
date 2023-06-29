exports = async function(improvementId, userId){
  const  collection = context.services.get("mongodb-atlas").db("requestly").collection("improvements");
  
  collection.updateOne({ _id: improvementId }, { $push: { voters: userId }})
  .then(result => {
    const { matchedCount, modifiedCount } = result;
    if(matchedCount && modifiedCount) {
      console.log(`Successfully updated the item.`)
    }
  })
  .catch(err => console.error(`Failed to update the item: ${err}`))

};