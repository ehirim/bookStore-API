const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Config
dotenv.config({path:'config/config.env'});



// app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));


// Routers
const bookRouter = require('./routes/bookRoute');
const orderRouter = require('./routes/orderRoute');
const userRouter = require('./routes/userRoute');

const api = process.env.API_URL;

app.use(`${api}/books`, bookRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);



// Database Connection
connectDatabase();

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


