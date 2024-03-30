require('dotenv').config();
const express = require('express');
const app = express();
const rootRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', rootRouter);


app.listen(port, () => {
    console.log(`App running on port: ${port}`);
})