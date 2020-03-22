const express = require('express');
const router = express.Router();
const jobsController = require('../app/api/controllers/jobs');

router.get('/', jobsController.getAll);
router.post('/', jobsController.create);
router.get('/:jobId', jobsController.getById);
router.put('/:jobId', jobsController.updateById);
router.delete('/:jobId', jobsController.deleteById);
module.exports = router;