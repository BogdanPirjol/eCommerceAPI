const { UnauthorizedError } = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
    //console.log(requestUser, resourceUserId);
    if(requestUser.role === 'admin' || resourceUserId === requestUser.id)
        return
    throw new UnauthorizedError('Not authorized to perform this action');
}

module.exports = checkPermissions;