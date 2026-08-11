const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeAnalytics,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// All employee routes are protected by JWT authentication
router.use(protect);

router.route('/').get(getEmployees).post(createEmployee);

// Static analytics route must be registered BEFORE parametric :id route
router.route('/analytics').get(getEmployeeAnalytics);

router
  .route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
