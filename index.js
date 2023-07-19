const express = require('express');
const app = express();
const PORT = 3000;

const { handleTypeError } = require('./middleware/error');
const { dbConnection } = require('./config/config');

app.use(express.json());

dbConnection();

app.use('/users', require('./routes/users'));
app.use('/doubts', require('./routes/doubts'));
app.use('/answers', require('./routes/answers'));

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
