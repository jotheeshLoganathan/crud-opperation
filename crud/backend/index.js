const express=require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
// middleware connect to frontend 78
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello yoke welcome")
});


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://yokeshboya4624:yoke8489sh4624*@cluster0.2xn37.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
      await client.connect();
    const ProductCollection = client.db("pantloonsDB").collection("womenProduct");
//women path
      app.post("/product", async (req, res) => {
          const data = req.body;
          const result = await ProductCollection.insertOne(data);
          res.send(result);
      });

      app.get("/allproduct", async (req, res) => {
          const womenProduct = ProductCollection.find();
          const result = await womenProduct.toArray();
          res.send(result);
      });
      app.get("/product/:id", async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
          const result = await ProductCollection.findOne(filter);
          res.send(result);
      });
      app.patch("/products/:id", async (req, res) => {
          const id = req.params.id;
          const update = req.body;
          const filter = { _id: new ObjectId(id) };
          const updateDoc = { $set: { ...update } };
          const option = { upsert: true };
          const result = await ProductCollection.updateOne(
              filter,
              updateDoc,
              option
          );
          res.send(result);
      });
      app.delete("/product/:id", async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
          const result = await ProductCollection.deleteOne(filter);
          res
              .status(200)
              .json({ success: true, message: "data deleted successfully", result });
      });
    
   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`conneted to mongodb running on : ${port}`);
});
