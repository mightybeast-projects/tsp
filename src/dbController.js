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

async function insertOrUpdate(newState, userEmail)
{
    await checkConnection();
    await collection.replaceOne({ userEmail : userEmail }, newState, { upsert: true });
}

async function findSavedState(userEmail)
{
    await checkConnection();
    return await collection.find({userEmail : userEmail}).toArray();
}

module.exports = {
    insertOrUpdate,
    findSavedState
};