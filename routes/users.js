const router = require('express').Router();

const {
  // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// router.post('/', createUser);
router.get('/', getUser);
router.get('/:id', getUserById);
router.patch('/:me', updateProfile);
router.patch('/:_id/avatar', updateAvatar);

module.exports = router;
