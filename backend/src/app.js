const runServer = require('./server').runServer;
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
