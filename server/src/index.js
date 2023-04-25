const express = require("express");
const route = require("./routes/routes.js")
const mongoose = require("mongoose")
const cors=require('cors')
const app = express()

mongoose.set('strictQuery', true)
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://prakashurkude:prakash1998@cluster0.nuhssqs.mongodb.net/linkcutter",
{useNewUrlParser:true})

.then(()=> console.log("MongoDb is connected"))
.catch (err => console.log(err))

app.use('/',route);

app.listen(process.env.PORT || 3001 ,function() {
    console.log("Express app running on port" + (process.env.PORT || 3001))
});