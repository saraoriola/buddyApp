const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(
  'mongodb+srv://buddyApp:yS4EbAYgCviRKyVT@buddyapp.8uzjbhy.mongodb.net/buddyApp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async () => {
  try {
    const userData = [
      {
        name: 'Adrian',
        lastName: 'Pastor',
        email: 'adrianpastorlopez09@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Adrian',
        lastName: 'Ramirez',
        email: 'adrianramirezgalera@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Juanda',
        lastName: 'Mayorga',
        email: 'juandamt@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Miguel',
        lastName: 'Herrera',
        email: 'migue.herrera@thebridgeschool.es',
        password: 'password123',
        role: 'teacherAssistant',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Patricia',
        lastName: 'Fernandez',
        email: 'paferza@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Patricia',
        lastName: 'Gonzalez',
        email: 'gonzalezgpatricia@hotmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Sara',
        lastName: 'Oriola',
        email: 'saraoriola@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Sofia',
        lastName: 'Pinilla',
        email: 'sofia@thebridgeschool.es',
        password: 'password123',
        role: 'teacher',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Victor',
        lastName: 'Macedo',
        email: 'victor.macedo.dedeus@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
      {
        name: 'Yolanda',
        lastName: 'Lopez',
        email: 'yolandalopevi@gmail.com',
        password: 'password123',
        role: 'student',
        punctuation: 0,
        confirmed: true,
        doubtList: [],
      },
    ];

    await User.insertMany(userData);

    console.log('Datos iniciales de usuarios creados con exito.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al crear los datos iniciales de usuarios:', error);
  }
};

createSeedData();
