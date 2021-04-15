let User = require('../model/users');
var jwt = require('jsonwebtoken');
var config = require('./config');
var bcrypt = require('bcryptjs');

// Récupérer un utilisateur avec username et password en post
function auth(req, res){
    let username = req.body.username;
    let userPassword = req.body.password;
    User.findOne({username: username}, (err, user) =>{
        if(err) res.send({ auth: false, token: null});
        //res.json(user);*/
        else {
            if(user!= null){
                var isValidPassword = bcrypt.compareSync(userPassword, user.password);
                if(user && isValidPassword){
                    var token = jwt.sign({ id: user._id , username:user.username, fullname: user.fullname, roles: user.roles }, config.secret, {
                        expiresIn: 300 // expires in 300 second
                      });
                    //  var decoded = jwt_decode(token)
                    
                    res.status(200).send({ auth: true, token: token});
                }
                else res.send({ auth: false, token: null});
            }
            else res.send({ auth: false, token: null}); 
        }    
    })
}



//signUp user
function signUp(req,res){
    var user = new User();
    user.username = req.body.username;
    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    user.password = hashedPassword;
    user.fullname = req.body.fullname;
    user.roles = req.body.roles;
    User.findOne({username: user.username}, (err, userTest) =>{
        if(err) return 0;
        //res.json(user);*/
        else {
            if(userTest != null){
                var isValidPassword = bcrypt.compareSync(req.body.password, userTest.password);
                if(isValidPassword) res.json({signUp: false, message: "Register failed! User duplicate." })
                else {
                    user.save( (err) => {
                        if(err) res.send({signUp: false, message: "Error register!"});
                        else  res.json({signUp: true, message: ""+user.fullname+" saved !" })
                    })
                }
            }
            else{
               
                user.save( (err) => {
                    if(err) {
                        
                        res.send({signUp: false, message: "Error register!"});
                    }
                    else  res.json({signUp: true, message: ""+user.fullname+" saved !" })
                })
            }  
        }
    });
}


// Récupérer un utilisateur avec username et password en post
function getUserByUsername(req, res){
    let username = req.params.id;
    let aggregate = User.aggregate([
      { $match: {username: username}},
      { $lookup: {
        from: "roles",
        localField: "roles",
        foreignField: "id",
        as: "role_user" 
      }}
    ]);
  
    let options = { 
        
    };
    // callback
    User.aggregatePaginate(aggregate, options, (err, user) => {
    
        if (err) {
          res.send(err);
        }
        res.send(user.docs[0]);
      }
    );
  
}

function getUser(req, res){
    User.find((err, user) => {
        if(err){
            res.send(err)
        }
        res.send(user);
    });
}

module.exports = { auth, getUserByUsername, getUser, signUp }