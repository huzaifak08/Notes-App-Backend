const express = require('express');
require("./Database/connection");
const notesRoute = require("./Routers/notes_route");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(notesRoute);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});