const { default: mongoose } = require('mongoose');
const createError = require('http-errors');
const Bookings = require('../../../models/BookingModel');
const HouseModel = require('../../../models/HouseModel');


const Booking = async (req, res, next) => {
  try {
   if(req.body){ 
    req.body.Renter = req.CurrentUser._id; 
    const HouseId = req.body.HouseData
    const savedata = await Bookings(req.body).save();
    const status = await HouseModel.findOneAndUpdate({_id:HouseId},{availabilityStatus:"Booked"})
     res.send(savedata);
   }
   else{
    next(createError(400, "Please provide all required data"))              
   }
  } catch (err) {
    console.log(err)                
    next(createError(500, "There is Server side Error"))
  }
}



module.exports = Booking;
