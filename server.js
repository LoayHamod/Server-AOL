const express = require("express");
const session = require('cookie-session');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// Use async/await here
(async () => {
  try {
    await db.mongoose.connect("mongodb+srv://serverAol:xqepEDi6K9xjB61X@aol.ttbhmkw.mongodb.net/AOL-db);
    console.log("Successfully connect to Database.");
    initial();
  } catch (err) {
    console.error("Connection error", err);
    process.exit(1); // Exit with an error code
  }
})();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AOL application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/lecture.routes")(app);
require("./app/routes/exam.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


async function initial() {
  const count = await Role.estimatedDocumentCount();

  if (count === 0) {
    try {
      await new Role({
        name: "user"
      }).save();
      console.log("added 'user' to roles collection");

      await new Role({
        name: "admin"
      }).save();
      console.log("added 'admin' to roles collection");
    } catch (err) {
      console.log("error", err);
    }
  }
}
