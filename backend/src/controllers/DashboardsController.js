const connection = require('../database/connection');
const { create } = require('./UsersController');

module.exports = {
    async index(req, res) {
        const { id } = req.params;
        const idUser = req.headers.authorization;

        connection.query(`SELECT id, model, agrupe, tablee, valuess, id_screen, title FROM objects WHERE id_screen = ${id} and id_user = ${idUser}`, (err, result) => {
            if(err) throw res.json(err);
            else {
                res.json(result);
            }
        })
    },

    async create(req, res) {
        const { id } = req.params;
        const { title, table, type, model, agrupe, values, idUser } = req.body;

        connection.query(`INSERT INTO objects(title, tablee, type, model, agrupe, valuess, id_user, id_screen)
                                        VALUES('${title}', '${table}', '${type}', '${model}', '${agrupe}', '${values}', ${idUser}, ${id})`);
    }
}
