const Peoples = require('../../../models/PeopleModel');
const createError = require('http-errors');


const UpdatePeopleData = async (req, res, next) => {
  try {
  const _id = req.CurrentUser._id;
  const result = await Peoples.findByIdAndUpdate( { _id: _id }, { $set: { username: req.body.username, avatar: req.body.avatar } }, { new: true } );
  res.send(result)

  } catch (err) {
    console.log(err)                
    next(createError(500, "There is Server side Error"))
  }
}

module.exports = UpdatePeopleData;
