const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/:userId').get(getSingleUser).patch(updateUser).post(updateUsersPassword);
router.route('/:userId').get(showCurrentUser);

module.exports = router;