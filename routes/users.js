const router = require('express').Router();
const { updateProfile, getProfile } = require('../controllers/users');
const { validateProfileData } = require('../middlewares/validate');

router.get('/me', getProfile);

router.patch('/me', validateProfileData, updateProfile);

module.exports = router;
