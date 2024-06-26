const db = require("../models");
const Lecture = db.lectures;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const lecture = new Lecture({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  try {
    const data = await lecture.save(lecture);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tutorial."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  try {
    const data = await Lecture.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Lecture.findById(id);
    if (!data)
      res.status(404).send({ message: "Not found Tutorial with id " + id });
    else res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Tutorial with id=" + id });
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
    const data = await Lecture.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    } else res.send({ message: "Tutorial was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Lecture.findByIdAndRemove(id, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    } else {
      res.send({
        message: "Tutorial was deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id
    });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Lecture.deleteMany({});
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all tutorials."
    });
  }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  try {
    const data = await Lecture.find({ published: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};