let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let assignment = require("./routes/assignments");
let users = require("./routes/users");
let role = require("./routes/roles");
let matieres = require("./routes/matieres");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri =
  "mongodb+srv://tanjona:Mongo220799@cluster0.ejbhp.mongodb.net/assignments?retryWrites=true&w=majority";
//mongodb+srv://tanjona:Mongo220799@cluster0.ejbhp.mongodb.net/assignments?retryWrites=true&w=majority

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app.route(prefix + "/assignments").get(assignment.getAssignments);

app.route(prefix + '/assignmentsRendu')
  .get(assignment.getAssignmentsRendu);
app.route(prefix + '/assignmentsNonRendu')
  .get(assignment.getAssignmentsNonRendu);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app
  .route(prefix + "/assignments")
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

//route pour user
app.route(prefix + "/user/:id").get(users.getUserByUsername);

app.route(prefix + "/user").get(users.getUser);

app.route(prefix + "/user/signIn").post(users.auth);
app.route(prefix + "/user/signUp").post(users.signUp);

//route pour roles
app.route(prefix + "/roles").get(role.getRole);

// route pour matieres
app.route(prefix + "/matieres").get(matieres.getMatieres);
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
