import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 100000 },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);