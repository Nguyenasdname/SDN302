const express = require('express');
const router = express.Router();
const feedbackController = require('./feedback.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');
const { allowRoles } = require('../../middlewares/roleMiddleware');

router.get('/:resortId/resort', feedbackController.getFeedbackByResortId)
router.get('/:resortId/stars', feedbackController.getFeedbackStatsByResortId)
router.post('/', tokenProvider, feedbackController.writeFeedback)
router.patch('/edit', tokenProvider, feedbackController.editFeedback)


module.exports = router;
