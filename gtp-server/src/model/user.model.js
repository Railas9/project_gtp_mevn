const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
  name: String,
  password: String,
  occupied: Boolean,
});

const User = mongoose.model('users', userSchema);



module.exports = User;