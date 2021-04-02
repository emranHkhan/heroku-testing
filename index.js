const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vllde.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors())
app.use(express.json())



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("volunteer").collection("events");
  
  app.post('/addEvent', (req, res) => {
      const newEvent = req.body;
      console.log(newEvent);
      eventCollection.insertOne(newEvent)
      .then(result =>{
          console.log('count', result.insertedCount);
          res.send(result.insertedCount > 0)
      })
  })

  app.get('/events', (req, res) => {
    eventCollection.find()
    .toArray((err, items) => {
        res.send(items);
    })
  })

//   app.delete('/delete/:id', (req, res) => {
//       const id = ObjectId(req.params.id);

//   })






});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})