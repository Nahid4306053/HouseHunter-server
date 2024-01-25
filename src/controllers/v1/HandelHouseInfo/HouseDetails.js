const { default: mongoose } = require('mongoose');
const createError = require('http-errors');
const houses = require('../../../models/HouseModel');


const HouseDetails = async (req, res, next) => {
  try {
   if(req.params.id){ 
    const data = await houses.findOne({_id:req.params.id})
     res.send(data);
   }
   else{
    next(createError(400, "Please provide all required data"))              
   }
  } catch (err) {
    console.log(err)                
    next(createError(500, "There is Server side Error"))
  }
}

module.exports = HouseDetails;
