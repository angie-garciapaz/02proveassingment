const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://agarciapaz:DCXOUP3rXYX9f6Pl@cluster0.iiook.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback()
        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No databaes found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

