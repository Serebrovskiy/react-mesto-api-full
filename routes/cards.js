const router = require('express').Router();

const { validateCard, validateId } = require('../middlewares/requestValidation');

const {
  createCard,
  getAllCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateId, deleteCard);
router.put('/:id/likes', validateId, addLikeCard);
router.delete('/:id/likes', validateId, removeLikeCard);

module.exports = router;
