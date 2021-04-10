const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "new",
    database: "linktopia_db",
    host: "localhost",
    port: "5432"
})

module.exports = pool;