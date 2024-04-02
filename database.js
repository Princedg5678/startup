const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("blastZone");
const userCollection = db.collection("user");
const ratingCollection = db.collection("avgRating");
const submissionCollection = db.collection("userSubmissions");

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

async function getRatings() {
  const cursor = await ratingCollection.find({});
  return cursor.toArray()[0];
}

async function createRatings(listKey, rating) {
  // Filter to check if the document exists
  const filter = {};

  // Update operation
  const updateOperation = {
    $push: { [`ratingList${listKey}`]: rating },
  };

  // Options for upsert
  const options = { upsert: true };

  // Perform the upsert operation
  const updateResult = await ratingCollection.updateOne(
    filter,
    updateOperation,
    options
  );
}
/*
function getSubmssion1(username) {
  return ratingCollection.findOne({ submissions1: submissions1 });
}

function getSubmssion2(username) {
  return ratingCollection.findOne({ submissions2: submissions2 });
}

function getSubmssion3(username) {
  return ratingCollection.findOne({ submissions3: submissions3 });
}

async function createSubmission() {
  const submission1 = {
    submissions1: submissions1,
  };
  const submission2 = {
    submissions2: submissions2,
  };
  const submission3 = {
    submissions3: submissions3,
  };
}
*/
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getRatings,
  createRatings,
  /*getSubmssion1,
  getSubmssion2,
  getSubmssion3,
  createSubmission,*/
};
