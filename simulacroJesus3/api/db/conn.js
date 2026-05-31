const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToDatabase: async () => {
    try {
      await client.connect();
      dbConnection = client.db('academy');
      console.log('Succesfully connected to database');
    } catch (e) {
      console.error(e);
      process.exit();
    }
  },

  getDb: function () {
    return dbConnection;
  }
};
