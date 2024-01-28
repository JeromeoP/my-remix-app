import config from "../config";


const MONGODB_URI = config.MONGODB_URI || 'your_mongodb_connection_string';
if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }
  const mongoose = require('mongoose');

  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: any) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

export default mongoose;
