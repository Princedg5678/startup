const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const DB = require("./database.js");
const { peerProxy } = require("./peerProxy.js");

const authCookieName = "token";

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//let username = "";
//let password = "";

// CreateAuth token for a new user
apiRouter.post("/create", async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post("/login", async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

apiRouter.get("/user", (request, response) => {
  response.send({ username });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

function setAuthCookie(res, authToken) {
  console.log("Cookie Created");
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  console.log(req.cookies, "token");
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// DeleteAuth token if stored in cookie
secureApiRouter.delete("/logout", (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetRatings
/*
secureApiRouter.get("/scores", async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});
*/

// SubmitRating
secureApiRouter.post("/rating", async (req, res) => {
  const data = req.body;
  console.log(data);
  await DB.createRatings(data.storedKey, data.storedRating);
  res.sendStatus(200);
});

//getRatings
secureApiRouter.get("/rating", async (req, res) => {
  await DB.getRatings();
  res.sendStatus(200);
});
