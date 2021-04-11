const http = require('http')
var pg = require('pg');
const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

var resp = ''

// const server = http.createServer();
// const port = 8081
// const host = 'localhost'
// server.listen(port, host)
// console.log(`Listening at http://${host}:${port}`)

startExpress = async() => {
  const app = express()

  var allowedOrigins = [
    'https://electchain-scvs.herokuapp.com/'
    'http://localhost:8081'];

  app.use(cors({

  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Access-Control-Allow-Origin'],

  credentials: true,
}));

  app.get("*", cors({

    origin: function(origin, callback){
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  
    exposedHeaders: ['Access-Control-Allow-Origin'],
  
    credentials: true,
  }), function(req, res) {
    console.log(req.headers)
    console.log('GET')
    console.log(req.url)
    let URLParams = new URLSearchParams(req.url)
    let query = '';
    if (URLParams.get('type') == 1) {
      query = `SELECT COUNT(*) from linktopia WHERE
        ssn='${URLParams.get('/?ssn')}' AND
        first_name='${URLParams.get('fname')}' AND
        last_name='${URLParams.get('lname')}' AND
        dob='${URLParams.get('dob')}' AND
        address IS NULL`
    } else if (URLParams.get('type') == 2) {
      query = `SELECT ssn, first_name, last_name, dob, town, state FROM linktopia 
      ORDER BY RANDOM()
      LIMIT 1`
    } else if (URLParams.get('type') == 3) {
      query = `SELECT * from linktopia WHERE
      address='${URLParams.get('address')}'`
    }
    getDB(query)
    console.log(res)
    res.send(resp)
  })

  app.post('*', cors({

    origin: function(origin, callback){
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  
    exposedHeaders: ['Access-Control-Allow-Origin'],
  
    credentials: true,
  }), function(req, res) {
    if (request.method == 'POST') {
      console.log('POST')
      let URLParams = new URLSearchParams(request.url)
      query = `UPDATE linktopia SET
        address='${URLParams.get('address')}' WHERE
        ssn='${URLParams.get('/?ssn')}' AND
        first_name='${URLParams.get('fname')}' AND
        last_name='${URLParams.get('lname')}' AND
        dob='${URLParams.get('dob')}'`
      console.log(query)
      getDB(query)
      console.log(res)
      res.send(resp)
    }})

  const port = process.env.PORT || 8081
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

}


// server.on('request', async (request, response) => {
//   if (request.method == 'POST') {
//     console.log('POST')
//     let URLParams = new URLSearchParams(request.url)
//     query = `UPDATE linktopia SET
//       address='${URLParams.get('address')}' WHERE
//       ssn='${URLParams.get('/?ssn')}' AND
//       first_name='${URLParams.get('fname')}' AND
//       last_name='${URLParams.get('lname')}' AND
//       dob='${URLParams.get('dob')}'`
//     console.log(query)
//     await getDB(query)
//     response.writeHead(200, {
//     "Access-Control-Allow-Headers": "*",
//     "Access-Control-Allow-Origin" : "*",
//     'Content-Type': 'application/json'
//   })
//     response.end(JSON.stringify(resp));
//   } else {
//     console.log('GET')
//     let URLParams = new URLSearchParams(request.url)
//     let query = '';
//     if (URLParams.get('type') == 1) {
//       query = `SELECT COUNT(*) from linktopia WHERE
//         ssn='${URLParams.get('/?ssn')}' AND
//         first_name='${URLParams.get('fname')}' AND
//         last_name='${URLParams.get('lname')}' AND
//         dob='${URLParams.get('dob')}' AND
//         address IS NULL`
//     } else if (URLParams.get('type') == 2) {
//       query = `SELECT ssn, first_name, last_name, dob, town, state FROM linktopia 
//       ORDER BY RANDOM()
//       LIMIT 1`
//     } else if (URLParams.get('type') == 3) {
//       query = `SELECT * from linktopia WHERE
//       address='${URLParams.get('address')}'`
//     }
//     await getDB(query)
//     console.log(resp)
//     response.writeHead(200, {
//       "Access-Control-Allow-Headers": "*",
//       "Access-Control-Allow-Origin" : "*",
//       'Content-Type': 'application/json'
//     })
//     response.end(JSON.stringify(resp));
//   } 
// })

getDB = async(query) => {
  var conString = "postgres://ujbgxlwy:Seo5GSBlI3W7rZdgOPems-QTC6kZ9IbN@ziggy.db.elephantsql.com:5432/ujbgxlwy" //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(function(err) {
  if(err) {
      return console.error('could not connect to postgres', err);
  }
  client.query(query, function(err, result) {
      if(err) {
      return console.error('error running query', err);
      }

      resp = result.rows[0]
      
      client.end();
      return resp;
    });
  });
}

startExpress();