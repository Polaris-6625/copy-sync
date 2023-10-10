// 引入 LowDB
// 遇到引用问题请降级，使用 1.0.0 或 2.X.X 再试
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// const lowdb = import('lowdb')
// const FileSync = import('lowdb/adapters/FileSync')
// import lowdb from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync("./data/data.json");
const db = lowdb(adapter);
module.exports = db;