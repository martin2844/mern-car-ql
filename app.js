// 1.First of all require express
const express = require('express');
// 5.Require extra packages
const graphqlHTTP = require('express-graphql');
// 7.After defining schemas in schema.js, import it here 
const schema = require('./schema/schema');

//8. require mongoose
const mongoose = require('mongoose');

require('dotenv').config()

//10.require cors
const cors = require('cors');

//9. Connect to mongodb using mongoose connect. Using Mongo Atlas
mongoose.connect( "mongodb+srv://" + process.env.MONGO + "@cluster0-ekehs.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }).then(() => {
    console.log('connected to database');
   });





//2. declare app
const app = express();

//11. allow cors
app.use(cors());


//6. setup middleware for express, so that it can understand graphql
app.use('/graphql', graphqlHTTP({
    //use es6, to shorten schema:schema to schema
    schema,
    graphiql: true

}));


//3. declare port
const PORT = process.env.PORT || 5000;

//4. App needs to listen to the port.
app.listen(PORT, console.log(`server started on ${PORT}`));