let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let MatieresSchema = Schema({
  id: Number,
  matiere: String,
  imageMatiere: String,
  imageProf: String,
});

MatieresSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUDa
module.exports = mongoose.model("Matieres", MatieresSchema, "matieres");
