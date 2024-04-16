const db = require("../models");
const Exam = db.exams;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const exam = new Exam({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  try {
    const data = await exam.save(exam);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Exam."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  try {
    const data = await Exam.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving exams."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Exam.findById(id);
    if (!data)
      res.status(404).send({ message: "Not found Exam with id " + id });
    else res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Exam with id=" + id });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await Exam.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Exam with id=${id}. Maybe Exam was not found!`
      });
    } else res.send({ message: "Exam was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Exam with id=" + id
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Exam.findByIdAndRemove(id, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`
      });
    } else {
      res.send({
        message: "Exam was deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Exam with id=" + id
    });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Exam.deleteMany({});
    res.send({
      message: `${data.deletedCount} Exams were deleted successfully!`
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all exams."
    });
  }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  try {
    const data = await Exam.find({ published: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving exams."
    });
  }
};