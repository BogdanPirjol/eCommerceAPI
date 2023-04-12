require('dotenv').config();

const express = require('express');
const app = express();

//database
const connectDB = require('./db/connectDB');

//default route
app.get('/', (req, res) => {
    res.send('<h1> E-Commerce API</h1>');
});

//something went wrong middleware
const notFound = require('./middleware/notFound');
app.use(notFound);


const start = async () => {
    try{
        //checking connection to DB
        const sequelize = await connectDB();
        await sequelize.authenticate();

        //strating server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Starting server on port ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();