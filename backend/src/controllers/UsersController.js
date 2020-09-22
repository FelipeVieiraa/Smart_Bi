const connection = require('../database/connection');

module.exports = {
    async logon(req, res) {
        const { username, password } = req.body;

        connection.query(`SELECT id, username, email, whats, uf, city FROM smartbi.users where username = '${username}' or email = '${username}' and password = '${password}'`, (err, results) => {
            if(err){
                return res.json(err);
            }
                console.log(results);
                return res.json(results);
            
        });

    },


    async create(req, res) {
        const { username, email, password, whats, uf, city } = req.body;

        connection.query(`INSERT INTO users (username, email, password, whats, uf, city)
                         values('${username}',
                            '${email}',
                            '${password}', 
                            '${whats}', 
                            '${uf}', 
                            '${city}')`,
                            (err, result) => {
                                if(err) throw res.json(err);
                                res.json(result);
                            }
                        );
    },

    
}