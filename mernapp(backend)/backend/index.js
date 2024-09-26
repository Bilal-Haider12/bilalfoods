const express = require('express');
const mongoDB = require('./db'); // Ensure this is the path to your db.js file
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;

const orderDataRoutes = require('./Routes/OrderData');

// Call the async function to connect to MongoDB
mongoDB();

// Use cors middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST'],         // Allowed methods
    credentials: true                 // If you are using credentials (cookies, etc.)
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!1234');
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api/auth', orderDataRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
