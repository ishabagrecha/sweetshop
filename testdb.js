const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://sweetshop_user:sweet1234@cluster1.wxirxm7.mongodb.net/?appName=Cluster1";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
