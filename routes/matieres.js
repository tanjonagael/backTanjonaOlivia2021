let Matieres = require("../model/matieres");
function getMatieres(req, res) {
  Matieres.find((err, matieres) => {
    if (err) {
      res.send(err);
    }
    res.send(matieres);
  });
}

module.exports = { getMatieres };
