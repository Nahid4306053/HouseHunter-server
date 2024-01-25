const router = require('express').Router();
const createError = require('http-errors');
const Houses = require('../../../models/HouseModel');
const Bookings = require('../../../models/BookingModel');
const ChangeBookingStatus = async (req,res,next)=>{
 try{
  const Bookid = req.params.id;
  const result = await Bookings.findOneAndUpdate({_id:Bookid},{status:req.body.status},{new:true});
   await Houses.findOneAndUpdate({_id:result.HouseData},{availabilityStatus: req.body.status === "Cancelled"  ?  "Available" : "Booked"});
    res.json(result);

 }catch(err){
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}

module.exports = ChangeBookingStatus;

