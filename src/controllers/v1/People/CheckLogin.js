const Peoples = require('../../../models/PeopleModel');
const createError = require('http-errors');
const bcrypt = require('bcryptjs')

const CheckLogin = async (req, res, next) => {
  try {

    if (req.body.email) {  
      const isuserExits = await Peoples.findOne({
        email: req.body.email
      })
      if (isuserExits){
        const isPasswordCorrect =  bcrypt.compareSync(req.body.password, isuserExits.password)            
        if(!isPasswordCorrect){
          next(createError(403, "Your Password is Wrong"))           
       }
        else{
         const  { username, email, avatar, phone, role } = isuserExits;
         req.CurrentUser = {  username, email, avatar, phone, role }
         next();
        }
       } else {  
          next(createError(403, "User not Found")) 
       }    
      } else {
        next(createError(500, "There is Server side Error"))
      }

  } catch (err) {
    console.log(err)                
    next(createError(500, "There is Server side Error"))
  }
}



module.exports = CheckLogin;
