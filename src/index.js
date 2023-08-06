const express = require('express');
require("./Database/connection");
const notesRoute = require("./Routers/notes_route");
const authRouter = require("./Routers/auth_route");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notesRoute);
app.use(authRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});