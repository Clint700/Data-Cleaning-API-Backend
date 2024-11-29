const { 
    fetchValidData, 
    fetchInvalidData, 
    insertValidData, 
    insertInvalidData, 
    updateValidDataById, 
    updateInvalidDataById, 
    deleteValidDataById, 
    deleteInvalidDataById 
  } = require('./model');
  
  const getValidData = async (req, res, next) => {
    try {
      const data = await fetchValidData();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  const getInvalidData = async (req, res, next) => {
    try {
      const data = await fetchInvalidData();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  const createValidData = async (req, res, next) => {
    try {
      const record = await insertValidData(req.body);
      console.log(record)
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  };
  
  const createInvalidData = async (req, res, next) => {
    try {
      const record = await insertInvalidData(req.body);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  };
  
  const updateValidData = async (req, res, next) => {
    try {
      const record = await updateValidDataById(req.params.id, req.body);
      res.status(200).json(record);
    } catch (err) {
      next(err);
    }
  };
  
  const updateInvalidData = async (req, res, next) => {
    try {
      const record = await updateInvalidDataById(req.params.id, req.body);
      res.status(200).json(record);
    } catch (err) {
      next(err);
    }
  };
  
  const deleteValidData = async (req, res, next) => {
    try {
      await deleteValidDataById(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
  
  const deleteInvalidData = async (req, res, next) => {
    try {
      await deleteInvalidDataById(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getValidData,
    getInvalidData,
    createValidData,
    createInvalidData,
    updateValidData,
    updateInvalidData,
    deleteValidData,
    deleteInvalidData,
  };