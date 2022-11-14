require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

app.locals.appTitle = `AuthApp_`

require('./config/session.config')(app)   // session setup

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

require("./error-handling")(app);

module.exports = app