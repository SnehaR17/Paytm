const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://snehadrdn:LOmDecEvr0aZXgwx@cluster0.a126x.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}