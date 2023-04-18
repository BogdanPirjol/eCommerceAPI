require('dotenv').config();

const express = require('express');
require('express-async-errors');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));

//database
const connectDB = require('./db/connectDB');
 
//default route
app.get('/', (req, res) => {
    res.send('<h1> E-Commerce API</h1>');
});

//routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

//something went wrong middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try{
        //checking connection to DB
        const sequelize = await connectDB();
        await sequelize.authenticate();

        //sync models
        await sequelize.sync();
        //await sequelize.drop();

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