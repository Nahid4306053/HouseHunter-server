const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner:{
     type : mongoose.Types.ObjectId,
     ref : "peoples"
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  room_size: {
    type: Number,
    required: true,
  },
  availability_date: {
    type: Date,
    required: true,
  },
  rent_per_month: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rent_per_month: {
    type: Number,
    required: true,
  },
  gallery: {
    type: Array,
    required: true,
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Booked', 'Maintenance'],
    default: 'Available',
  },
}, {
  timestamps: true,
});

const HouseModel = new mongoose.model('houses', houseSchema);
module.exports = HouseModel;
