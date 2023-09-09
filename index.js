const express = require('express');
const cors = require('cors'); // Importa el módulo 'cors'
const { dbConnection } = require('./config/config');
const { handleTypeError } = require('./middleware/error');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

dbConnection();

// Agrega el middleware 'cors' para manejar las solicitudes CORS
app.use(cors());

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/doubts', require('./routes/doubts'));
app.get('/', (req, res) =>
  res
    .status(200)
    .send(
      '<pre>Welcome to BuddyApp</pre><pre>Read the <a href="https://github.com/saraoriola/buddyApp#introduction">API docs</a>.</pre>'
    )
);

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
