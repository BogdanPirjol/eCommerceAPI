require('dotenv').config();

const express = require('express');
const app = express();

//database
const connectDB = require('./db/connectDB');


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