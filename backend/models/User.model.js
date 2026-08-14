import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY']
  },
  refreshToken: {
    type: String,
    select: false
  },
  googleId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
// it will come to this middleware only when we are creating a new user or updating the password of an existing user, to encrypt the password before saving it to the database.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //next();
  } catch (error) {
    //next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);


// password is not geting hashed when i am creating a new user and it is not getting compared when i am trying to login, so i will add some console logs in the pre save hook and in the compare password method to see if they are getting called or not and if they are getting called then what is the value of this.password and candidatePassword.
export default User;
