module.exports = app => {
  const lectures = require("../controllers/lecture.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", lectures.create);

  // Retrieve all Tutorials
  router.get("/", lectures.findAll);

  // Retrieve all published Tutorials
  router.get("/published", lectures.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", lectures.findOne);

  // Update a Tutorial with id
  router.put("/:id", lectures.update);

  // Delete a Tutorial with id
  router.delete("/:id", lectures.delete);

  // Create a new Tutorial
  router.delete("/", lectures.deleteAll);

  app.use("/api/lectures", router);
};