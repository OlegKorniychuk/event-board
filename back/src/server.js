const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');
const app = require('./app');
const cronJob = require('../scripts/cronJob');

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const dbConnection = process.env.MONGO_DB_CONNECTION.replace(
  'PASSWORD',
  process.env.MONGO_DB_PASSWORD
)

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log('DB connection succesful')
  })
  .catch((err) => {
    console.log('Could not connect to the database')
    throw err;
  });

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});

if (process.env.ENVIRONMENT === 'local') {
  cron.schedule('*/1 * * * *', cronJob);
}
