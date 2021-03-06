const express = require('express');
const server = require('./server').server;


server.use(express.json());

//Controllers
const UsersController = require('./controllers/UsersController');
const ScreensController = require('./controllers/ScreensController');
const ActivitiesController = require('./controllers/ActivitiesController');
const ConfigGraphs = require('./controllers/ConfigGraphs');
const DashboardsController = require('./controllers/DashboardsController');
const GraphsController = require('./controllers/GraphsController');


//Rotas:
server.post("/logon", UsersController.logon);
server.post("/users", UsersController.create);

server.get("/screens", ScreensController.index);
server.post("/screens", ScreensController.create);
server.delete("/screens/:id", ScreensController.delete);

server.get("/activities", ActivitiesController.index);
server.post("/activities", ActivitiesController.create);
server.delete("/activities/:id", ActivitiesController.delete);

server.get("/tables", ConfigGraphs.tables);
server.get("/columns", ConfigGraphs.columns);

server.get("/objects/:id", DashboardsController.index);
server.post("/objects/:id", DashboardsController.create);

server.get("/graph", GraphsController.index);

