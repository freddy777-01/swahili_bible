const path = require('path');
const fs = require('fs');
const sqlite = require('sqlite3')
const os = require('os')
const computerName = os.hostname()
// console.log(computerName);
const bibleCont = exports.bibleCont = ()=>{
    const fileN = path.join(__dirname + '\\Bibles\\','Swa2Bible.txt')
   return fs.readFileSync(fileN);
}

const bibleTitle = exports.bibleTitle = ()=>{
    const fileN = path.join(__dirname + '\\Titles\\','Swahili.txt')
    return fs.readFileSync(fileN);
}

// Database Tools
    // CONNECTS TO THE DATABASE
   const dbcon =exports.dbcon= new sqlite.Database(path.join(__dirname+'\\databases\\','notes.db'),(err)=>{
        if (err) {
            console.log("there is error");
        } else {
            console.log('connected to Database');
        }
    })
