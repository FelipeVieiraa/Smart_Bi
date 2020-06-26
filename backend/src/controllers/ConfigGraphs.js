const connection = require("../database/connection");

module.exports = {
    async tables(req, res) {

        connection.query("SELECT TABLE_NAME as tables FROM information_schema. tables where table_schema = 'smartbi' and table_name not in ('screens', 'users', 'activities')", (err, result) => {
            if (err) throw res.json(err);
            else {
                res.json(result);
            }
        })
    },

    async columns(req, res) {
        const table = req.headers.authorization;

        console.log(table);

        connection.query(`SELECT COLUMN_NAME as columnss FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'smartbi' AND TABLE_NAME = '${table}'`, (err, result) => {
            if(err) throw res.json(err);

            else {
                res.json(result);
            }
        })
    }
};