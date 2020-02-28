const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'An Employee must have a First Name'],
      trim: true,
      minlength: [
        3,
        'Employee First Name must have more or equal then 3 characters'
      ],
      validate: [
        validator.isAlpha,
        'Employee First Name must only contain characters'
      ]
    },
    lastName: {
      type: String,
      required: [true, 'An Employee must have a Last Name'],
      trim: true,
      minlength: [
        3,
        'Employee Last Name must have more or equal then 3 characters'
      ],
      validate: [
        validator.isAlpha,
        'Employee Last Name must only contain characters'
      ]
    },
    email: {
      type: String,
      required: [true, 'An Employee must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
