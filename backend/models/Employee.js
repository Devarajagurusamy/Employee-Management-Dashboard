const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an employee name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an employee email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Please add a designation'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Please specify status'],
      enum: {
        values: ['Active', 'Inactive'],
        message: 'Status must be either Active or Inactive',
      },
      default: 'Active',
    },
    joiningDate: {
      type: Date,
      required: [true, 'Please add a joining date'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
