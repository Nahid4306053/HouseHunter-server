const Peoples = require('../../../models/PeopleModel');
const createError = require('http-errors');
const bcrypt = require('bcryptjs')

const CreatePeople = async (req, res, next) => {
  try {

    if (req.body.email) {  
      const isuserExits = await Peoples.findOne({
        email: req.body.email
      })
      if (isuserExits) {
        next(createError(500, "User Already Exits"))
      } else {  
     
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password , salt);
  
        const result = await Peoples({...req.body,password : hash}).save()
        CurrentUser = result;
      }    
      res.send("User Regestation SuccessFully")
    } else {
      next(createError(500, "There is Server side Error"))
    }
  } catch (err) {
    console.log(err)                
    next(createError(500, "There is Server side Error"))
  }
}



module.exports = CreatePeople;
