const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const SchemaGenerator = require('./SchemaGenerator')

// const collectionName = 'User'
// const userSchema = new SchemaGenerator(collectionName, {
const userSchema = new mongoose.Schema(
  {
    // googleId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User', // Default role
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
