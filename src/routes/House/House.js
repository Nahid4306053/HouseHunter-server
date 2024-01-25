const Addhouse = require("../../controllers/v1/HandelHouseInfo/AddHouse");
const Booking = require("../../controllers/v1/HandelHouseInfo/Booking");
const CancelBooking = require("../../controllers/v1/HandelHouseInfo/CancelBooking");
const houseDetails = require("../../controllers/v1/HandelHouseInfo/HouseDetails");
const ChangeStatus = require("../../controllers/v1/HandelHouseInfo/ChangeStatus");
const MyBookings = require("../../controllers/v1/HandelHouseInfo/MyBookings");
const gethousesData = require("../../controllers/v1/HandelHouseInfo/getHousesData");
const upcomingBoookings = require("../../controllers/v1/HandelHouseInfo/upcomingBoookings");
const VerifyUser = require("../../middlewares/Auth/Verifyuser");
const AllBookings = require('../../controllers/v1/HandelHouseInfo/AllBookings');
const ChangeBookingStatus = require("../../controllers/v1/HandelHouseInfo/ChangeBookingStatus");
const CheckBooking = require("../../controllers/v1/HandelHouseInfo/CheckBooking");
const houseFilter = require("../../controllers/v1/HandelHouseInfo/houseFilter");

const house = require("express").Router() 

house.post("/add" , VerifyUser , Addhouse);
house.get("/all", VerifyUser ,  gethousesData);
house.get("/filter" , houseFilter);
house.get("/singel/:id" , houseDetails);
house.get("/my-booking" ,VerifyUser , MyBookings);
house.get("/upcoming-booking" ,VerifyUser , upcomingBoookings);
house.get("/bookings" ,VerifyUser , AllBookings);
house.get("/booking/:id" ,VerifyUser , CheckBooking);
house.post("/book" , VerifyUser , Booking);
house.patch("/status/:id" , VerifyUser , ChangeStatus);
house.patch("/book/status/:id" , VerifyUser , ChangeBookingStatus);
house.delete("/book/cancel/:id" , VerifyUser , CancelBooking);
module.exports = house;   

  