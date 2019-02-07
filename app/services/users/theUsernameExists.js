let User = require('../../models/User');

module.exports = async function usernameExists(req) {
   
   let user;
   let number = 0;
   let newUsername;

   do {
      newUsername = req.body.username + number;
      number++;
      user = await User.findOne({username: newUsername}).exec();    
   } while(user)

   return newUsername;
}