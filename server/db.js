const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/myDb";
// MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}, function(err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     const dbase = db.db("myDb");
//     const myList = {content: 'test!!!'}
//     dbase.collection("todolist").insertOne(myList, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });
function insertData(obj){
    MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        const dbase = db.db("myDb");
        // const myList = {content: 'test!!!'}
        dbase.collection("todolist").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    });
}
function findData(obj){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        const dbase = db.db("myDb");
        dbase.collection("todolist"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}
module.exports={
    insertData : insertData,
    findData   : findData,
}
