import mongoose from 'mongoose';

const Password = new mongoose.Schema({
  title: { type: String, required: true },
  password: { type: String, required: true },
  email:{ type: String, required: true }
});

const PasswordSchema = mongoose.model('Password', Password);

export default PasswordSchema;