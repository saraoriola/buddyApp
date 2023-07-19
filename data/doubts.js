const Doubt = require('../models/Doubt');
const mongoose = require('mongoose');
const dev = require('../config/config'); //get your mongoose string

//create your array. i inserted only 1 object here
const DoubtSchema = new Schema(
  new Doubt(
    {
      doubt: 'xxx?',
      user: '_idxxx',
      answers: [{ answer: 'xxx', user: '_idxxx', votes: 4 }],
      likes: '_idxxx',
    },
    {
      doubt: 'xxx?',
      user: '_idxxx',
      answers: [{ answer: 'xxx', user: '_idxxx', votes: 4 }],
      likes: '_idxxx',
    },
    {
      doubt: 'xxx?',
      user: '_idxxx',
      answers: [{ answer: 'xxx', user: '_idxxx', votes: 4 }],
      likes: '_idxxx',
    },
    { timestamps: true }
  )
);

//connect mongoose
mongoose
  .connect(String(dev.db), { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log('connected to db in development environment');
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
products.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === products.length - 1) {
      console.log('DONE!');
      mongoose.disconnect();
    }
  });
});
