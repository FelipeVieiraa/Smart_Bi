const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        connection.query("SELECT * FROM screens order by name asc", (err, results) => {
            if(err) {
                return res.json(err);
            }else{
                res.json(results);
            }

        })

    },

    async create(req, res) {
        const { name, image, idUser } = req.body;

        connection.query(`INSERT INTO screens(name, image, id_user)
                          VALUES('${name}', '${image}', '${idUser}')`,(err, result) => {
                              if(err) throw res.json(err);
                              else{
                                  res.json(result);
                              }
                          });

    },

    async delete(req, res) {
        const { id } = req.params;
        const id_user = req.headers.authorization;

        connection.query(`DELETE FROM screens WHERE id = ${id} AND id_user = ${id_user}`, (err, result) => {
            if(err) throw res.json(err)
            else {
                res.json(result);
            }
        });
    }
};