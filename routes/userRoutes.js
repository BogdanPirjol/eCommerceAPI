const router = require('express').Router();
const { authenticateUser, authorizeAdmin }= require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser } = require('../controllers/userController');
//public
router.route('/').get(authenticateUser, getAllUsers);

//protected
router.route('/showMe').get(authenticateUser, showCurrentUser);

//public
router.route('/:userId').get(authenticateUser, getSingleUser);


//protected
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updateUsersPassword);


module.exports = router;