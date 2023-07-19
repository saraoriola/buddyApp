const dotenv = require('dotenv');
const doubts = require('../data/doubts.js');
const users = require('../data/users.js');
const Doubts = require('../models/Doubts.js');
const User = require('../models/User.js');
const dbConnection = require('./config/config.js');

dotenv.config();

dbConnection();

const importDoubts = async () => {
  try {
    await Doubts.deleteMany();

    await Doubts.insertMany(doubts);

    console.log('Data Imported');
    process.exit();
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
};

const importUsers = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(user);

    console.log('Data Imported');
    process.exit();
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
};

importDoubts();
importUsers();
// deleteProducts();

// switch (process.argv[2]) {
// 	case '-d': {
// 		deleteProducts();
// 		break;
// 	}
// 	default: {
// 		importProducts();
// 	}
// }
