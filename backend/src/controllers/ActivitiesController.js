const connection = require('../database/connection');
const { index } = require('./ScreensController');

module.exports = {

    async index(req, res) {
        const idUser = req.headers.authorization;

        await connection.query(`SELECT * FROM activities WHERE id_user = '${idUser}'`, (err, result) => {
            if(err) throw res.json(err);
            else {
                res.json(result);
            }
        })
    },


    async create(req, res) {
        const { title, description, formatDate, idUser } = req.body;

        connection.query(`INSERT INTO activities(title, description, dt_activities, id_user)
                          VALUES('${title}', '${description}', '${formatDate}', '${idUser}')`);
    },

    async delete(req, res) {
        const { id } = req.params;
        const id_user = req.headers.authorization;

        connection.query(`DELETE FROM activities WHERE id = ${id} AND id_user = ${id_user}`, (err, result) => {
            if (err) throw res.json(err);
            else {
                res.json(result);
            }
        });
    }
}