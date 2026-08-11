const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const seedDefaultUser = async () => {
  try {
    const User = require('../models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
      });
      console.log('Default test user created: admin@example.com / password123');
    }
  } catch (error) {
    console.error('Error seeding default user:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultUser();
  } catch (error) {
    console.error(`Primary MongoDB connection error: ${error.message}`);
    await mongoose.disconnect().catch(() => {});
    if (process.env.MONGODB_URI !== 'mongodb://127.0.0.1:27017/employee_management') {
      try {
        console.log('Attempting local MongoDB connection fallback...');
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/employee_management', {
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`MongoDB Connected (Local Fallback): ${localConn.connection.host}`);
        await seedDefaultUser();
      } catch (fallbackErr) {
        console.error(`Local MongoDB connection error: ${fallbackErr.message}`);
      }
    }
  }
};

module.exports = connectDB;
