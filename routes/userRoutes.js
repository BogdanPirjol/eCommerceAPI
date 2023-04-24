const router = require('express').Router();
const { authenticateUser, authorizePermissions }= require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser } = require('../controllers/userController');
//public
router.route('/').get(authenticateUser, authorizePermissions('user'), getAllUsers);

//protected
router.route('/showMe').get(authenticateUser, showCurrentUser);

//public
router.route('/:userId').get(authenticateUser, getSingleUser);


//protected
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updateUsersPassword);


module.exports = router;