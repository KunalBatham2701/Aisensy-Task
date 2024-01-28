import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  mobileNumber: String,
  email: String,
  tags: [String],
  // Include any other fields as necessary
});

export default model('Contact', contactSchema);