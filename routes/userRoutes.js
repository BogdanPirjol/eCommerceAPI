const router = require('express').Router();
const { authenticateUser, authorizePermissions }= require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUsersPassword,
    showCurrentUser } = require('../controllers/userController');



router.use(authenticateUser);

//user role
router.route('/showMe').get(showCurrentUser);
router.route('/:userId').get(getSingleUser);
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updateUsersPassword);

//admin role
router.route('/').get(authorizePermissions('admin'), getAllUsers);


module.exports = router;