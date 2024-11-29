const express = require('express');
const {
  getValidData,
  getInvalidData,
  createValidData,
  createInvalidData,
  updateValidData,
  updateInvalidData,
  deleteValidData,
  deleteInvalidData,
} = require('./controller');

const router = express.Router();

// Routes for valid data
router.get('/validData', getValidData);
router.post('/validData', createValidData);
router.patch('/validData/:id', updateValidData);
router.delete('/validData/:id', deleteValidData);

// Routes for invalid data
router.get('/invalidData', getInvalidData);
router.post('/invalidData', createInvalidData);
router.patch('/invalidData/:id', updateInvalidData);
router.delete('/invalidData/:id', deleteInvalidData);

module.exports = router;