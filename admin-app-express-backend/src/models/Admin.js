const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const adminSchema = new Schema({
  employeeId: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String
});

adminSchema.pre("save", function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

adminSchema.methods.testPassword = function(inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const Model = model("admin", adminSchema);

module.exports = Model;
