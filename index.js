const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_SECTERE}@cluster0.df9nipl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

  try {
    
    const orderCollection = client.db("Chiaseed-we").collection("order")
    const headerDataCollection = client.db("Chiaseed-we").collection("header-Data")
    const NutritionalValueCollection = client.db("Chiaseed-we").collection("nutritional-value")
    const productDataCollection = client.db("Chiaseed-we").collection("product-Data")


    app.post("/order", async (req, res) => {

      const orderData = req.body;
      const result = await  orderCollection.insertOne(orderData)
      res.send(result)

    })
     
    // order get

    app.get('/orderGet', async(req, res) => {

      const query = {};
      const allData = await orderCollection.find(query).toArray();
      res.send(allData);

    })


    // header Section post

    app.post("/header", async (req, res) => {
          
      const headerData = req.body;
      const result = await headerDataCollection.insertOne(headerData)
      res.send(result)
        
    })
    // header Section get

    app.get("/headerGet", async (req, res) => {

      const query = {};
      const allData = await headerDataCollection.find(query).toArray();
      res.send(allData);
       
    })

    // product post

    app.post("/product", async (req, res) => {

       const productData = req.body;
       const result = await productDataCollection.insertOne(productData)
       res.send(result)

    })

    // product get

    app.get("/productGet", async (req, res) => {
       
      const query = {};
      const allData = await productDataCollection.find(query).toArray();
      res.send(allData);

    })
    

    
    // Chiaseed NutritionalValue post

    app.post("/nutritionalValue", async (req, res) => {
       
      const nutritionalValue = req.body;
      const result = await NutritionalValueCollection.insertOne(nutritionalValue)
      res.send(result)

    })

    //nutritionalValue get

    app.get("/nutritionalValueGet", async (req, res) => {
        
      const query = {};
      const allData = await NutritionalValueCollection.find(query).toArray();
      res.send(allData);

    })
    
  }
  finally {

  }

}
run().catch(error => console.log(error))


app.get('/', async (req, res) => {
  res.send('chiaseed web server running');
})

app.listen(port, () => console.log(`chiaseed web server ${port}`))