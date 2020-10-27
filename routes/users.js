const router = require('express').Router();

const { validateUserUpdate, validateAvatar, validateId } = require('../middlewares/requestValidation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
