const cors = require('cors');
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qqdsxtt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      await client.connect();
      const productCollection = client.db('moon-tech').collection('product');

      app.get("/products",async (req,res) =>{
        const cursor = productCollection.find({});
        const product = await cursor.toArray();
  
        res.send(product);
      })
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('moon tech is running')
})

app.listen(port, () => {
  console.log(`moon tech listen on port ${port}`)
})