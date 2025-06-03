const express = require("express");
const app = express();

app.use(express.json())

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use(handleNotFoundErrors);

module.exports = app;