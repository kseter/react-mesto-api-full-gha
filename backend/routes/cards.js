const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard, validateCardId,
} = require('../utils/validation');

router.get('/cards', getCards);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.post('/cards', validateCreateCard, createCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
