const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove()
          .then((removeCard) => res.send(removeCard));
      } else {
        throw new ForbiddenError('Вы не можете удалить данную карточку');
      }
    })
    .catch(next);
};

module.exports.addLikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.removeLikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
