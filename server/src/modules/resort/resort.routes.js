const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const resortController = require('./resort.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');


router.get('/', resortController.getAllResorts);

router.get('/:resortId', resortController.getResortById);

router.post('/', tokenProvider, allowRoles('employee', 'admin'), upload.array('images'), resortController.createResort);

router.put('/:id', tokenProvider, allowRoles('employee'), resortController.updateResort);

router.delete('/:id', tokenProvider, allowRoles('admin', 'employee'), resortController.deleteResort);

router.post('/available', resortController.getAvailableResorts);


module.exports = router;