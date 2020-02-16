const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const enviroment = require("./common/enviroment");
const routes = require("./routes");
const {setupWebsocket} = require("./websocket");


const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(enviroment.db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(enviroment.server.port);
