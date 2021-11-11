const { json } = require('body-parser');
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient
app.use(express.static(__dirname+ "/public"))
const bodyPasser = require('body-parser')
app.use(bodyPasser.urlencoded({extended: true}))
app.use(bodyPasser.json())
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../EmpMApp/config');



MongoClient.connect('mongodb://localhost:27017/CrudDB')
.then(client =>
{   const db = client.db("CrudDB");
    const employeeCollections = db.collection('employees')
    console.log('DB is connected..');

app.listen(1910 , () =>
{
    console.log('Server is Running');
})

app.get('/emp', (req, res) =>
 {
    db.collection('employees').find().toArray()
    .then(results => {
       // res.send(results);

        var token = jwt.sign({ id: '1234' }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ Results: results, token: token });
        
    })
    .catch(error => console.error(error))
  })

app.post('/emp', (req, res) => {
  console.log("Req token: in");
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log("CORRECT TOKEN")
    
  });

    employeeCollections.insertOne(req.body)
      .then(res =>
       {
          console.log("Sucess")
      })
      .catch(error => console.error(error))

  })

  app.get('/emp/:id', function (req, res)
   {
    var id = req.params.id;
    console.log(id)

    db.collection('employees').find({_id:ObjectId(id) }).toArray(function(err, result)
    {
      if (!err) 
      {
        res.send(result);
      }
      else
      {
        console.error(error)
      }
      
    }
      );

  });
    

  app.put('/emp/:id', function (req, res) 
  {
    var id = req.params.id;
    console.log(id);
    console.log("Boom");
    db.collection('employees').findOneAndUpdate({_id:ObjectId(id)},{$set: {name: req.body.name, position: req.body.position,
       office: req.body.office, salary: req.body.salary}},
     {upsert: true})
     .then(result => {
      console.log("Boom1");
       res.json('Success')

      })
     .catch(error => console.error(error))
  });

  app.delete('/emp/:id', function (req, res) 
  {
    var id = req.params.id;
    
    db.collection('employees').findOneAndDelete({_id:ObjectId(id)})
     .then(result =>
       {
       res.json('Success')
      })
     .catch(error => console.error(error))
  });

}).
catch(error => console.error(error))
