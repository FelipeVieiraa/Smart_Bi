const runServer = require('./server');
const routes = require('./routes');
const testeConnection = require('./database/connection');


class app {
    constructor(){
        super.use();

        this.server = runServer;
        this.routes = routes;
        this.db     = testeConnection;

        
    }
}
