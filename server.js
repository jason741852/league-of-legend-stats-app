const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./src/server/route/Routes");

//Static file declaration
app.use(express.static("dist"));

//Route setup
app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'public', 'index.html')); });
routes(app);

//Start server
app.listen(port, (req, res) =>
{
    console.log(`server listening on port: ${port}`)
});
