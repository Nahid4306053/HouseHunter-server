const statistics = require('express').Router();
const creteError = require("http-errors");
const VerifyUser = require('../../middlewares/Auth/Verifyuser');
const VerifyAdmin = require('../../middlewares/Auth/VerifyAdmin');
const Peoples = require('../../models/PeopleModel');
const paymentHistory = require('../../models/PaymnetHistoryModel');
const bookings = require('../../models/BookingModel');
const Houses = require('../../models/HouseModel');
const { default: mongoose } = require('mongoose');


statistics.get("/", VerifyUser, VerifyAdmin, async (req, res, next) => {
  try {
  const owner = req.CurrentUser._id;
  const totalRevenueResult = await paymentHistory.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(owner) 
      }
    },
    {
      $group: {
        _id: '$owner', 
        totalRevenue: {
          $sum: '$totalpay'
        },
      },
    }, 
  ]);

    const totalRevenue = await totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    const Pending = await bookings.countDocuments({owner:owner,
      status: "Pending"
    })
    const Cancelled = await bookings.countDocuments({owner:owner,
      status: "Cancelled"
    })
    const Confirmed = await bookings.countDocuments({owner:owner,
      status: "Confirmed"
    })  
    const Available = await Houses.countDocuments({owner:owner,
      availabilityStatus: "Available"
    })
    const Booked = await Houses.countDocuments({owner:owner,
      availabilityStatus: "Booked"
    })
    const Maintenance = await Houses.countDocuments({owner:owner,
      availabilityStatus: "Maintenance"
    })

    const Complited = await paymentHistory.countDocuments();

    const statics = {
      totalRevenue,
      totalBookings:
       {
        Pending,
        Cancelled,
        Confirmed,
        Complited 
        } ,     
       Houses: 
       {
        Available,
        Booked,
        Maintenance,
      }
      ,
    }

    res.send(statics)

  } catch (err) {
    console.log(err)
    next(creteError(500, 'There is server side error'))
  }
})


module.exports = statistics;
