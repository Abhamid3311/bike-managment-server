const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//used Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Bike Mangment Server running rasting')
});

app.listen(port, () => {
    console.log('Bike is listening at', port);
});