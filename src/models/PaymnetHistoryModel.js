const { Schema, default: mongoose, model } = require("mongoose");


const PaymnetHistoryModel = new Schema({
     payer:{
     type: mongoose.Types.ObjectId ,
     required: true,
     ref: 'peoples'              
     },    
     totalpay:{
     type: Number ,
     required: true,          
    },   
     transectionId:{
     type: String ,
     required: true,          
    },    
    HouseData:{
     type: mongoose.Types.ObjectId ,
     required: true,
     ref: 'houses'              
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }, 
                 
},
{
  timestamps: true
})

const paymentHistory = new model('paymentHistory',PaymnetHistoryModel)

module.exports = paymentHistory; 