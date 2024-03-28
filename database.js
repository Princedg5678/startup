const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("blastZone");
const userCollection = db.collection("user");
const ratingCollection = db.collection("avgRating");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function getRating(username) {
  return ratingCollection.findOne({ avgRating: avgRating });
}

async function createRatings() {
  const rating1 = {
    avgRating: avgRating,
  };
  const rating2 = {
    avgRating: avgRating,
  };
  const rating3 = {
    avgRating: avgRating,
  };
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
};
