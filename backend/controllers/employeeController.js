const mongoose = require('mongoose');
const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format',
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee fetched successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, designation, status, joiningDate } = req.body;

    if (!name || !email || !department || !designation || !status || !joiningDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, department, designation, status, joiningDate)',
      });
    }

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either Active or Inactive',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate employee email
    const existingEmployee = await Employee.findOne({ email: normalizedEmail });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: 'An employee with this email address already exists',
      });
    }

    const employee = await Employee.create({
      name: name.trim(),
      email: normalizedEmail,
      department: department.trim(),
      designation: designation.trim(),
      status,
      joiningDate,
    });

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format',
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    const { name, email, department, designation, status, joiningDate } = req.body;

    if (!name || !email || !department || !designation || !status || !joiningDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, department, designation, status, joiningDate)',
      });
    }

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either Active or Inactive',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email changed and duplicates exist
    if (normalizedEmail !== employee.email) {
      const existingEmployee = await Employee.findOne({ email: normalizedEmail });
      if (existingEmployee) {
        return res.status(409).json({
          success: false,
          message: 'An employee with this email address already exists',
        });
      }
    }

    employee.name = name.trim();
    employee.email = normalizedEmail;
    employee.department = department.trim();
    employee.designation = designation.trim();
    employee.status = status;
    employee.joiningDate = joiningDate;

    const updatedEmployee = await employee.save();

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format',
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    await employee.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
