const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
const dbName = "tsp";
const collectionName = "states";

var database;
var collection;

async function checkConnection(){
    if(database == undefined || collection == undefined){
        await mongoClient.connect();
        database = mongoClient.db(dbName);
        collection = database.collection(collectionName);
    }
}