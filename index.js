const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

const port = 4000;

const uri =
  "mongodb+srv://tanhasan1998:muhammad98@muhammadcluster.h7migjc.mongodb.net/?retryWrites=true&w=majority&appName=MuhammadCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const allCraftsCollection = client
      .db("allCraftsDB")
      .collection("allCrafts");

    const subcategoriesCollection = client
      .db("allCraftsDB")
      .collection("subcategories");

    // get all crafts data from database and send to client side
    app.get("/allCrafts", async (req, res) => {
      const result = await allCraftsCollection.find().toArray();
      res.send(result);
    });

    // get single craft data from database and send to client side
    app.get("/allCrafts/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await allCraftsCollection.findOne(query);
      res.send(result);
    });

    //  get  crafts data from database for user by email and send to client side
    app.get("/allCrafts/email/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { user_email: email };
      const result = await allCraftsCollection.find(query).toArray();
      res.send(result);
    });

    //  Get crafts data by subcategory from database and sent to the client side
    app.get("/allCrafts/subcategory/:subcategory", async (req, res) => {
      const subcategory = req.params.subcategory;
      console.log(subcategory);
      const query = { subcategory_name: subcategory };
      const result = await allCraftsCollection.find(query).toArray();
      res.send(result);
    });

    // get subcategories data from database and sent to client
    app.get("/subcategories", async (req, res) => {
      const result = await subcategoriesCollection.find().toArray();
      res.send(result);
    });

    // Insert each craft from client side to database through post method
    app.post("/allCrafts", async (req, res) => {
      const craft = req.body;
      console.log("New added craft item: ", craft);
      const result = await allCraftsCollection.insertOne(craft);
      res.send(result);
    });

    // update coffee details by PUT method from client side to Database
    app.put("/allCrafts/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const updateCraftInfo = req.body;
      console.log(updateCraftInfo);

      const filter = { _id: new ObjectId(id) }; // filter for getting targeted craft by its id
      const updateCraft = {
        $set: {
          item_name: updateCraftInfo.item_name,
          processing_time: updateCraftInfo.processing_time,
          subcategory_name: updateCraftInfo.subcategory_name,
          customization: updateCraftInfo.customization,
          price: updateCraftInfo.price,
          rating: updateCraftInfo.rating,
          image: updateCraftInfo.image,
          stock_status: updateCraftInfo.stock_status,
          short_description: updateCraftInfo.short_description,
          user_name: updateCraftInfo.user_name,
          user_email: updateCraftInfo.user_email,
        },
      };
      const options = { upsert: true };
      const result = await allCraftsCollection.updateOne(
        filter,
        updateCraft,
        options
      );
      res.send(result);
    });

    // get single craft data from database and send to client side
    app.delete("/allCrafts/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await allCraftsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My Artistry Creation Server is running here!");
});

app.listen(port, () => {
  console.log(`My server is listening on port ${port}`);
});
