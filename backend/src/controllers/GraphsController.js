const connection = require("../database/connection");
const { index } = require("./DashboardsController");

module.exports = {
    async index(req, res) {
        const tabl = req.headers.authorization;

        connection.query(`SELECT * FROM ${tabl}`, (err, result) => {
            if(err) throw res.json(err);
            else {
                res.json(result);
            }
        });
    }
}