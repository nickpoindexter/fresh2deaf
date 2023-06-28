exports = async function(arg){
  // if not admin user of app return
  if(context.user.type != "system" && !context.user.custom_data.admin) {
    return "invalid access";
  }

  var user = context.user;
  
  return {user};
};