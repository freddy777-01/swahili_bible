const path = require("path");
const Database = require("better-sqlite3");
const dbcon = (exports.dbcon = new Database(
  path.join(__dirname + "/db/", "notes.db"),
  {
    fileMustExist: true,
  }
));
if (dbcon) {
  console.log("Db Exists");
} else console.log("error");
// const dbcon = (exports.dbcon = new sqlite3.Database(
//   path.join(__dirname + "/db/", "notes.db"),
//   (err) => {
//     if (err) {
//       console.log("there is error");
//     } else {
//       console.log("connected to Database");
//     }
//   }
// ));

/* 
>>> THESE ARE QUERY METHODES for sqlite3.js
•	run: used to create or alter tables and to insert or update table data
•	get: select a single row of data from one or more tables
•	all: select multiple rows of data from one or more tables
  each: selects multiple rows of data and return each row as an boject

*/
