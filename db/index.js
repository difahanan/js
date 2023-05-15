 const { MongoClient, ServerApiVersion } = require('mongodb');

class Database {
    constructor(){
        this.db = null;
        this.run();
    }

async run() {
    // DATABASE URI
    const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@belajar-mongo.b5wdwis.mongodb.net/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Assign db variable
    this.db = client.db('my-server').collection('posts');
  }
}

module.exports = Database