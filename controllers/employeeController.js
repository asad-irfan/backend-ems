const Employee = require('../models/employeeModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllEmployees = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(Employee.find(), req.query).filter();
  const employees = await features.query;

  res.status(200).json({
    status: 'success',
    length: employees.length,
    result: {
      employees
    }
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    result: {
      employee
    }
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await Employee.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Employee created successfully!',
    result: {
      employee: newEmployee
    }
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Employee updated successfully!',
    result: {
      employee
    }
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Employee deleted successfully!'
  });
});
