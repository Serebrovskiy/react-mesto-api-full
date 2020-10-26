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
router.put('/likes/:id', addLikeCard);
router.delete('/likes/:id', removeLikeCard);

module.exports = router;
