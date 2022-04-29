const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// connect mongobd

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jr74c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('Mongodb connected');
async function run() {
  try {
    await client.connect();
    const productCollection = client.db('amazondb').collection('products');

    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products)
    });
  }
  finally { }
};
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Amazon server is running')
});

app.listen(port, () => {
  console.log('Amazon running to port', port)
})