const { Schema, model } = require("mongoose");


const PeopleModel = new Schema({    
     username:{
        type:String,
        required:true
     },    
     email:{
        type:String,
        required:true,
      
     },     
     phone:{
        type:String,
        required:true,
        
     },    
     avatar:{
        type:String,
        required:true
     },     
     password:{
        type:String,
        required:true
     }, 
     role:{
      type:String,
      enum:['House Owner','House Renter'],
      required:true
     }           
},{
     timestamps:true
})

const Peoples = new model('peoples',PeopleModel)

module.exports = Peoples; 