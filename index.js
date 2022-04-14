const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://action_camera:wd0CJJPRGbfUWnYC@cluster0.npegz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.post("/register", (req, res) => {
  client.connect((err) => {
    const collection = client.db("action_camera").collection("usersData");
    const result = collection.insertOne(req.body);
    res.send(result);
    // client.close();
  });
});
app.get("/isadmin/:email", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("usersData");
    const result = await collection.findOne({ email: email });
    res.send(result);
    // client.close();
  });
});
app.post("/orderplace", (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("buyRequests");
    const result = await collection.insertOne(req.body);
    res.send(result);
    // client.close();
  });
});
app.get("/myorders/:email", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("buyRequests");
    const result = collection.find({ email: email });
    const myOrders = await result.toArray();
    res.send(myOrders);
    // client.close();
  });
});
app.put("/order-make-approved/:id", (req, res) => {
  const id = req.params.id;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("buyRequests");
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateStatus = {
      $set: {
        status: "approved",
      },
    };
    const result = await collection.updateOne(filter, updateStatus, options);
    res.send(result);
    // client.close();
  });
});
app.get("/all-orders", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("buyRequests");
    const result = collection.find({});
    const allOrders = await result.toArray();
    res.send(allOrders);
    // client.close();
  });
});
app.delete("/myorders-remove-one/:id", (req, res) => {
  const id = req.params.id;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("buyRequests");
    const result = await collection.deleteOne({ _id: ObjectId(id) });
    res.send(result);
    // client.close();
  });
});
app.post("/add_a_product", (req, res) => {
  client.connect((err) => {
    const collection = client.db("action_camera").collection("products");
    const result = collection.insertOne(req.body);
    res.send(result);
    // client.close();
  });
});
app.post("/addToCart", (req, res) => {
  const newCartData = req.body;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("cart");
    const result = await collection.insertOne(newCartData);
    res.send(result);
    // client.close();
  });
});
app.get("/getToCart/:email", (req, res) => {
  const email = req.params.email;
  const id = req.query.id;
  console.log(email, id);
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("cart");
    const result = await collection.findOne({ email: email, id: id });
    console.log(result);
    res.send(result);
    // client.close();
  });
});
app.get("/singleUserCartData/:email", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("cart");
    const result = collection.find({ email: email });
    const singleUserAllCartData = await result.toArray();
    console.log(singleUserAllCartData);
    res.send(singleUserAllCartData);
    // client.close();
  });
});
app.delete("/singleUserCartDataDelete/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("cart");
    const result = await collection.deleteMany({ email: email });
    console.log(result);
    res.send(result);
    // client.close();
  });
});
app.get("/products6", (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("products");
    const result = collection.find({});
    const products = await result.limit(6).toArray();
    res.send(products);
    // client.close();
  });
});
app.get("/all-products", (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("products");
    const result = collection.find({});
    const products = await result.toArray();
    res.send(products);
    // client.close();
  });
});
app.get("/users", (req, res) => {
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("usersData");
    const result = collection.find({});
    const allUsers = await result.toArray();
    res.send(allUsers);
    // client.close();
  });
});

app.put("/user/makeadmin/:email", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("usersData");
    const filter = { email: email };
    const options = { upsert: true };
    const updateData = {
      $set: {
        role: "ADMIN",
      },
    };
    const result = await collection.updateOne(filter, updateData, options);
    res.send(result);
    // client.close();
  });
});
app.put("/user/removeadmin/:email", (req, res) => {
  const email = req.params.email;
  client.connect(async (err) => {
    const collection = client.db("action_camera").collection("usersData");
    const filter = { email: email };
    const options = { upsert: true };
    const updateData = {
      $set: {
        role: "USER",
      },
    };
    const result = await collection.updateOne(filter, updateData, options);
    res.send(result);
    // client.close();
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log("lisening to port ", port);
});
