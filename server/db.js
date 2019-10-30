const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/myDb";
/**
 * 链接数据库
 * @param {回调} cb 
 */
function connectDb(cb){
    MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        cb(db);
        db.close();
    });
}
/**
 * 插入新的数据
 * @param {数据库名称} dbName 
 * @param {集合名称} collectionName 
 * @param {要插入的对象} obj 
 */
function insertData(dbName, collectionName, obj){
    return new Promise ((resolve, reject)=>{
        connectDb(function(db) {
            const dbase = db.db(dbName);
            // const myList = {content: 'test!!!'}
            dbase.collection(collectionName).insertOne(obj, function(err, res) {
                console.log("文档插入成功");
                if(err) {
                    reject(err)
                }
                resolve(res)
            });
        });
    })
}
/**
 * 查找
 * @param {数据库名} dbName 
 * @param {集合名} collectionName 
 */
function findData(dbName, collectionName){
    return new Promise ((resolve, reject)=>{
        connectDb(function(db) {
            const dbase = db.db(dbName);
            dbase.collection(collectionName).find({}).toArray((err, res)=>{
                console.log(res);
                if(err) {
                    reject(err)
                }
                resolve(res)
            });
        });
        
    })
}
module.exports={
    insertData : insertData,
    findData   : findData,
}
