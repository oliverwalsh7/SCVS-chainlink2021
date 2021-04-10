const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // req => body

//ROUTES//

// get all ssn
app.get("/linktopia_db/linktopia/", async(req, res) => {
  try {
    const fetchSSN = await pool.query("SELECT ssn FROM linktopia ")
    res.json(fetchSSN.rows);
  } catch (err) {
    console.error(err.message)
  }
})

const port = 5000;
app.listen(5000, () => {
  console.log("SERVER RUNNING AT PORT " + port );
})
