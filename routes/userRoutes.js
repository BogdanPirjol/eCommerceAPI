const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/showMe').get(showCurrentUser);
router.route('/:userId').get(getSingleUser).patch(updateUser).post(updateUsersPassword);

module.exports = router;