const router = require('express').Router();
const createError = require('http-errors');
const houses = require('../../../models/HouseModel');
const gethousesData = async (req,res,next)=>{
 try{
  const page = req.query.page || 1;
  const limit = req.query.limit || 8  ; 
  const owner = req.CurrentUser._id ;
  const query = {owner:owner};
  const totalData = await houses.countDocuments(query);
  const result = await  houses.find(query).skip((page-1) * limit).limit(limit).sort({"createdAt":-1})
  res.json({totalData:totalData , houses : result});

 }
 catch(err){
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}

module.exports = gethousesData;

  