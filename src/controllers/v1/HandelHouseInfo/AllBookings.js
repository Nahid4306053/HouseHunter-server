const router = require('express').Router();
const createError = require('http-errors');
const Bookings = require('../../../models/BookingModel');
const AllBookings = async (req,res,next)=>{
 try{
  const page = req.query.page || 1;
  const limit = req.query.limit || 8  ; 
  const query = {};
  const owner = req.CurrentUser._id
  const totalData = await Bookings.countDocuments({owner:owner});
  const result = await  Bookings.find({owner:owner}).sort({PickUpDate : -1}).skip((page-1) * limit).limit(limit).populate('HouseData').populate({path:"Renter",select:"username avatar _id"});
  res.json({totalData:totalData , Houses : result});
 }
 catch(err){  
   console.log(err);
   next(createError(500,'There is a server side errro'));                   
 }
}

module.exports = AllBookings;

