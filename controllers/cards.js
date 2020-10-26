const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/frorbidden-error');

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .catch(() => {
      throw new BadRequestError();
    })
    .then((card) => {
      res.send(card);
    })

    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        res.send(card);
      } else {
        throw new ForbiddenError({ message: 'Вы не можете удалить данную карточку' });
      }
    })
    .catch(next);
};

module.exports.addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
