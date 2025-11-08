const express = require('express');
const router = express.Router();
const feedbackController = require('./feedback.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/resort/:resortId', feedbackController.getFeedbackByResort);
router.get('/top', feedbackController.getTopResorts);
router.post('/', tokenProvider, upload.array('images', 5), feedbackController.createFeedback);
router.get('/me', tokenProvider, feedbackController.getMyFeedbacks);
router.put('/:id', tokenProvider, upload.array('images', 5), feedbackController.updateFeedback);
router.delete('/:id', tokenProvider, feedbackController.deleteFeedback);
router.post('/:id/helpful', tokenProvider, feedbackController.markHelpful);
router.post('/:id/flag', tokenProvider, feedbackController.flagFeedback);
router.post('/:id/reply', tokenProvider, allowRoles('employee', 'admin'), feedbackController.replyToFeedback);
router.post('/:id/moderate', tokenProvider, allowRoles('admin'), feedbackController.moderateFeedback);

module.exports = router;
