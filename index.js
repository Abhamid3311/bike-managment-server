const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//used Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upsvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const bikeCollections = client.db("Bikes-managment").collection("bikes");

        //Get All Bikes
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = bikeCollections.find(query);
            const bikes = await cursor.toArray();
            res.send(bikes);
        });
        //Get Singel Bike
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const bike = await bikeCollections.findOne(query);
            res.send(bike);
        });
        //Post
        app.post('/inventory', async (req, res) => {
            const newBike = req.body
            const addBike = await bikeCollections.insertOne(newBike);
            res.send(addBike);
        });
        //DELETE
        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteItem = await bikeCollections.deleteOne(query);
            res.send(deleteItem);
        });

    }
    finally {

    }
}






run().catch(console.dir());



app.get('/', (req, res) => {
    res.send('Bike Mangment Server running rasting')
});

app.listen(port, () => {
    console.log('Bike is listening at', port);
});