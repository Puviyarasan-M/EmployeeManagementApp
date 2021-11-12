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
const auth = require("../EmpMApp/middleware/auth");



MongoClient.connect('mongodb://localhost:27017/CrudDB')
.then(client =>
{   const db = client.db("CrudDB");
    const employeeCollections = db.collection('employees')
    console.log('DB is connected..');

app.listen(1910 , () =>
{
    console.log('Server is Running');
})

app.get('/emp',(req, res) =>
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

app.post('/emp', auth ,(req, res) => {
  

    employeeCollections.insertOne(req.body)
      .then(res =>
       {
          console.log("Sucess")
      })
      .catch(error => console.error(error))

  })

  app.get('/emp/:id', auth,function (req, res)
   {
    var id = req.params.id;
  

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
    

  app.put('/emp/:id', auth,function (req, res) 
  {
    var id = req.params.id;

    db.collection('employees').findOneAndUpdate({_id:ObjectId(id)},{$set: {name: req.body.name, position: req.body.position,
       office: req.body.office, salary: req.body.salary}},
     {upsert: true})
     .then(result => {
      
       res.json('Success')

      })
     .catch(error => console.error(error))
  });

  app.delete('/emp/:id', auth,function (req, res) 
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
