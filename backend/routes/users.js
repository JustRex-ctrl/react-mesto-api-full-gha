const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { userIdSchema, avatarSchema, userUpdateSchema } = require('../middlewares/joi-schemas');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/:userId', celebrate({ params: userIdSchema }), getUserById);
router.patch('/me', celebrate({ body: userUpdateSchema }), updateUser);
router.patch('/me/avatar', celebrate({ body: avatarSchema }), updateAvatar);

module.exports = router;
