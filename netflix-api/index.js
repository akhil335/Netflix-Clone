const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://Sakhil335:Sakhil335@ac-4cegqpa-shard-00-00.hb3yhfn.mongodb.net:27017,ac-4cegqpa-shard-00-01.hb3yhfn.mongodb.net:27017,ac-4cegqpa-shard-00-02.hb3yhfn.mongodb.net:27017/netflix?ssl=true&replicaSet=atlas-a255to-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(uri, (err)=>{
    if(err) console.log(err)
    else console.log("Connected to MongoDB")
   });

app.use('/api/user', userRoutes);

app.listen(5000, console.log("server started"))