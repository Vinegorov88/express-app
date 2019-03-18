let moment = require('moment');
let User = require('../../models/User');
 
module.exports = async function usernameExists(username){
 
   let user, newUsername, char, number = 0, letters = "", usernameNumbers = "";

   for(let i = username.length - 1; i >= 0; i --){

      char = username[i];

      if(!letters && parseInt(char)) usernameNumbers = char + usernameNumbers;
      else letters = char + letters; 
   }

   do { 
      if(usernameNumbers) usernameNumbers++, newUsername = letters + usernameNumbers;
      else newUsername = letters + number, number++;

      user = await User.findOne({username: newUsername}).exec();
   } while(user)
 
   return newUsername;
}










