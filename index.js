const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://action_camera:wd0CJJPRGbfUWnYC@cluster0.npegz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("client connected");
//   app.get("/clientget", (req, res) => {
//     res.send("client 1");
//   });
//   app.get("/clientget2", (req, res) => {
//     res.send("client 2");
//   });

//   client.close();
// });
app.get("/test", (req, res) => {
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    console.log("client connected");
    res.send("from db");
    client.close();
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log("lisening to port ", port);
});
