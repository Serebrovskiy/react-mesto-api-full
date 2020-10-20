const router = require('express').Router();

const {
  createCard,
  getAllCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getAllCards);
router.delete('/:id', deleteCard);
router.put('/:id/likes', addLikeCard);
router.delete('/:id/likes', removeLikeCard);

module.exports = router;
