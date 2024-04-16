const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.lectures = require("./lecture.model.js")(mongoose);
db.exams = require("./exam.model.js")(mongoose);

db.ROLES = ["user", "admin"];

module.exports = db;
