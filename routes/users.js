const router = require('express').Router();

const {
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:id', getUserById);
router.patch('/me', updateProfile);
router.patch('/:_id/avatar', updateAvatar);

module.exports = router;
