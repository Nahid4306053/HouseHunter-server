
const CreatePeople = require("../../controllers/v1/People/CreatePeople")
const SetAddtionalInfo = require("../../controllers/v1/People/SetAddtionalInfo")
const CreateAccessToken = require("../../middlewares/Auth/CreateAccessToken")
const VerifyUser = require("../../middlewares/Auth/Verifyuser")
const getPeople= require("../../controllers/v1/People/getPeoples")
const ChangeRole= require("../../controllers/v1/People/ChangeRole")
const CheckLogin = require("../../controllers/v1/People/CheckLogin")
const UpdatePeopleData = require("../../controllers/v1/People/UpdatePeopleData")
const User = require("express").Router()

User.post('/',CreatePeople );
User.post('/login', CheckLogin , CreateAccessToken);
User.patch('/set-addtional-info',VerifyUser , SetAddtionalInfo);
User.get('/', VerifyUser , (req,res)=>{    
const { username, email, avatar, phone, role} = req.CurrentUser 
res.send({ username, email, avatar, phone, role})
});
User.patch('/role/:id',VerifyUser , ChangeRole);
User.put('/update',VerifyUser , UpdatePeopleData)
module.exports = User     