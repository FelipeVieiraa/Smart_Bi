const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vieira05",
    database: "smartbi"
});

//ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "vieira05";
const testeConnection = connection.connect((err) => {
    if(err) throw err;
    console.log("mysql conectado!");
});


//Migrations

var sql = [`CREATE TABLE IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(30) NOT NULL,
                whats VARCHAR(20) NOT NULL,
                uf VARCHAR(2) NOT NULL,
                city VARCHAR(20) NOT NULL
            )`,

            `CREATE TABLE IF NOT EXISTS activities (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description VARCHAR(300) NOT NULL,
                dt_activities DATETIME NOT NULL,
                id_user INT NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users(id)
            )`,

            `CREATE TABLE IF NOT EXISTS screens (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                image VARCHAR(300) NOT NULL,
                dashboards VARCHAR(50) DEFAULT NULL,
                id_user INT NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users(id)
            )`,

            `CREATE TABLE IF NOT EXISTS objects (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                dashboard VARCHAR(200) DEFAULT NULL,
                tablee VARCHAR(100) NOT NULL,
                title VARCHAR(100) NOT NULL,
                type VARCHAR(20) NOT NULL,
                model VARCHAR(20) NOT NULL,
                agrupe VARCHAR(100) NOT NULL,
                valuess VARCHAR(300) NOT NULL,
                id_user INT NOT NULL,
                id_screen INT NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users(id),
                FOREIGN KEY (id_screen) REFERENCES screens(id)
            ) `
        ]

sql.map( query => {
    connection.query(query);
} );


module.exports = connection;