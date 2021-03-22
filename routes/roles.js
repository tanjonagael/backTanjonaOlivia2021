let Roles = require('../model/roles');
function getRole(req, res){
    Roles.find((err, roles) => {
        if(err){
            res.send(err)
        }
        res.send(roles);
    });
}

module.exports = { getRole }