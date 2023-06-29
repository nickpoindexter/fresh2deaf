exports = async function(improvementId){
      const improvementOId = new BSON.ObjectId(improvementId)
      if (!improvementOId) {
        console.error("must include improvement id")
        return
      }
      
      const userId = context.user.id;
      
      console.log(improvementOId)
     
      const mongodb = context.services.get("mongodb-atlas");
      const improvement = await mongodb
        .db("requestly")
        .collection("improvements")
        .findOne({ _id: improvementOId})
        
      if (!improvement) {
        console.error("improvement does not exist")
        return;
      }
      
      if ((improvement.voters || []).includes(userId)) {
        console.error("can only vote for an improvement once ")
        return;
      }
      
      context.functions.execute("addVoterToImprovement", improvementOId, userId)
};