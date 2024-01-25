const mongoose = require('mongoose');

// Define the schema
const rentalSchema = new mongoose.Schema({
  Renter: {
    type: mongoose.Types.ObjectId,
    ref: 'peoples',
    required: true
  },
  HouseData: {
    type: mongoose.Types.ObjectId,
    ref: 'houses', 
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Cancelled'],
    default: 'Pending'
  }
});

// Create the model
const Bookings = new mongoose.model('Bookings', rentalSchema);

module.exports = Bookings;
