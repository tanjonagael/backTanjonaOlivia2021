const { aggregate } = require("../model/assignment");
let Assignment = require("../model/assignment");

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  let aggregate = Assignment.aggregate([
    { $lookup: {
      from: "matieres",
      localField: "idMatiere",
      foreignField: "id",
      as: "matiere" 
    }},
    { $sort : { dateDeRendu : -1} }
  ]);

  let options = { 
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
  };
  // callback
  Assignment.aggregatePaginate(aggregate, options, (err, assignments) => {
  
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

// Récupérer tous les assignments rendu(GET)
function getAssignmentsRendu(req, res) {
 
  let aggregate = Assignment.aggregate([
    { $match: {rendu:true}},
    { $lookup: {
      from: "matieres",
      localField: "idMatiere",
      foreignField: "id",
      as: "matiere" 
    }},
    { $sort : { dateDeRendu : -1} }
  ]);
let options = { 
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20,
  };
  // callback
  Assignment.aggregatePaginate(aggregate, options, (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    });  
}

// Récupérer tous les assignments non_rendu(GET)
function getAssignmentsNonRendu(req, res) {
 
  let aggregate = Assignment.aggregate([
    { $match: {rendu:false}},
    { $lookup: {
      from: "matieres",
      localField: "idMatiere",
      foreignField: "id",
      as: "matiere" 
    }},
    { $sort : { dateDeRendu : -1} }
  ]);
let options = { 
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20,
  };
  // callback
  Assignment.aggregatePaginate(aggregate, options, (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    });  
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = parseInt(req.params.id);
 
  let aggregate = Assignment.aggregate([
    { $match: {id: assignmentId}},
    { $lookup: {
      from: "matieres",
      localField: "idMatiere",
      foreignField: "id",
      as: "matiere" 
    }}
  ]);

  let options = { 
      
  };
  // callback
  Assignment.aggregatePaginate(aggregate, options, (err, assignments) => {
  
      if (err) {
        res.send(err);
      }
      res.send(assignments.docs[0]);
    }
  );

}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.idMatiere = req.body.idMatiere;
  assignment.note = req.body.note;
  assignment.remarque = req.body.remarque;
  assignment.auteur = req.body.auteur;

  console.log("POST assignment reçu :");
  console.log(assignment.nom);

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ updated: true });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}




module.exports = { getAssignments, getAssignmentsRendu,getAssignmentsNonRendu, postAssignment, getAssignment, updateAssignment, deleteAssignment };
