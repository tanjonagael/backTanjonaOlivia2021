let User = require('../model/users');

// Récupérer un utilisateur avec username et password en post
function postUserByLogin(req, res){
    let username = req.body.username;
    let userPassword = req.body.password;
    User.findOne({username: username, password: userPassword}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}


// Récupérer un utilisateur avec username et password en post
function getUserByUsername(req, res){
    let usernameVal = req.params.id;
    User.findOne({id: usernameVal}, (err, user) =>{
        if(err){
            res.send(err)
        }
        res.json(user);
    })
}
function getUser(req, res){
    User.find((err, user) => {
        if(err){
            res.send(err)
        }
        res.send(user);
    });
}

module.exports = { postUserByLogin, getUserByUsername, getUser }