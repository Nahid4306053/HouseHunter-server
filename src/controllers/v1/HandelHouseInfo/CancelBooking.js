const router = require('express').Router();
const createError = require('http-errors');
const Houses = require('../../../models/HouseModel');
const Bookings = require('../../../models/BookingModel');
const CancelBooking = async (req,res,next)=>{
 try{
  const bookid = req.params.id;
  const result = await Bookings.findOneAndDelete({_id:bookid});
  await Houses.findOneAndUpdate({_id:result.HouseData},{availabilityStatus:"Available"});
  res.json(result);
  

 }catch(err){
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}

module.exports = CancelBooking;

