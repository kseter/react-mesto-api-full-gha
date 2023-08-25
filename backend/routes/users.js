const router = require('express').Router();
const {
  getUsers, getUserByID, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');
const {
  validateUpdateProfile, validateAvatar, validateUserId,
} = require('../utils/validation');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);
router.patch('/users/me', validateUpdateProfile, updateUserInfo);
router.get('/users/:userId', validateUserId, getUserByID);

module.exports = router;
