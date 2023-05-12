const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const noteRoute = require('./Route/noteRoute');
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/api/v1/notes', noteRoute);

const DBConnection = process.env.DATABASE;
mongoose.connect(DBConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully!');
}).catch(() => {
    console.log('Database connection failed');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App connected at port ${PORT}`);
});
