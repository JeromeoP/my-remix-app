// models/user.ts
import mongoose from '../db/mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Add any other user fields you need
});

const User = mongoose.model('User', userSchema);

export default User;
