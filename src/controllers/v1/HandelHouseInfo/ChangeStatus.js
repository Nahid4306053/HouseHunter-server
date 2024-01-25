const router = require('express').Router();
const createError = require('http-errors');
const Houses = require('../../../models/HouseModel');
const ChangeStatus = async (req,res,next)=>{
 try{
  const Houseid = req.params.id;
  const result = await Houses.findOneAndUpdate({_id:Houseid},{availabilityStatus:req.body.availabilityStatus});
  res.json(result);
  console.log(result,req.body.availabilityStatus)

 }catch(err){
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}

module.exports = ChangeStatus;

