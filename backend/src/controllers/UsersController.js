const connection = require('../database/connection');

module.exports = {
    async logon(req, res) {
        const { username, password } = req.body;

        if(!(username.length > 0 || password.length > 0)) {
            res.status(400).send("Preencher corretamente username e password.");
        }

        connection.query(`SELECT username FROM smartbi.users where username = '${username}' and password = '${password}'`, (err, results) => {
            if(err){
                return res.json(err);
            }else if( results.length == 0 ) {
                return res.status(400).json({ error: 'Usuário não existe!' });
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