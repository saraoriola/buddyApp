const express = require('express');
const { dbConnection } = require('./config/config');
const { handleTypeError } = require('./middleware/error');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001;

dbConnection();

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/doubts', require('./routes/doubts'));

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
