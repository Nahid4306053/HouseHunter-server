const router = require('express').Router();
const createError = require('http-errors');
const houses = require('../../../models/HouseModel');
const houseFilter = async (req,res,next)=>{
 try{
  const page = req.query.page || 1;
  const limit = req.query.limit || 8  ; 
  const query = {};
  const sortop = {
      "createdAt": -1
  }
//   houses?minPrice=25&maxPrice=500&addtime=-1&status=Available&Bedroom=Toyota&model=RAV4
  if(req.query.minPrice && req.query.maxPrice){
    query.rent_per_month = { $lte: req.query.maxPrice, $gte: req.query.minPrice };
  }   
  if(req.query.status){
   query.availabilityStatus = req.query.status
  } 
  if(req.query.addtime){ 
    sortop["createdAt"] = parseInt(req.query.addtime);
  }  
  if(req.query.BedRoom){
    query.bedrooms =  req.query.BedRoom;
  }  
   if(req.query.BathRoom){
     query.bathrooms =  req.query.BathRoom;
   }
  const totalData = await houses.countDocuments(query);
  const result = await  houses.find(query).sort(sortop).skip((page-1) * limit).limit(limit);
  res.json({totalData:totalData , houses : result});
 }
 catch(err){
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}   

module.exports = houseFilter;

