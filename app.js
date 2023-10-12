require('dotenv').config();

const express = require('express');
require('express-async-errors');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//security packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const cors = require('cors');

app.use(helmet());
app.use(cors());
app.use(xssClean());

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
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
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

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

        //starting server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Starting server on port ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}

start(); 