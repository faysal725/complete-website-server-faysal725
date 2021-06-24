const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hozny.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());


const port = 5000;

app.get('/', (req, res) =>{
    res.send("hello from db its working nodsfasdfw")
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db("BikeService").collection("services");
  const userCollection = client.db("BikeService").collection("userCollection");


//   client.close();


  app.post('/addService', (req, res) => {
    const newService = req.body;
    console.log('this is new service', newService)
    orderCollection.insertOne(newService)
    .then(result => {
      console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0)
    })

    console.log('database connected successfully')

});


app.get('/service', (req, res) =>{
    orderCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
    console.log('service connected successfully')
  })


});


app.listen(process.env.PORT || port)