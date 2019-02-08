let User = require('../../models/User');
 
module.exports = async function usernameExists(username){
 
   let user, lastNumber, number = 0, usernameNumbers = "";
   let newUsername = username;
 
   for(let i = 0; i < username.length; i ++){
      lastNumber = parseInt(username.substr(username.length - 1));
 
      if(lastNumber){
         usernameNumbers += lastNumber;
         username = username.slice(0, -1);          
      }    
      else{
         break;
      }          
   }
   
   if(usernameNumbers.length ){
      usernameNumbers = parseInt((usernameNumbers.split('').reverse().join('')));
      usernameNumbers += 1;
      newUsername = username + usernameNumbers;
   }
   
   do {    
      user = await User.findOne({username: newUsername}).exec();
      if(!usernameNumbers.length && user){
         newUsername = username + number;
         number += 1;
      }    
   } while(user)
 
   return newUsername;
}
