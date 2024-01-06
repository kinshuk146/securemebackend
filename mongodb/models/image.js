import mongoose from 'mongoose';

const Image = new mongoose.Schema({
  email:{ type: String, required: true },
  image:{ type: String, required: true }
});

const ImageSchema = mongoose.model('Image', Image);

export default ImageSchema;