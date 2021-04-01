const path = require('path');
const fs = require('fs');
const sqlite = require('sqlite3')
const os = require('os')
const computerName = os.hostname()
// console.log(computerName);
console.log(os.userInfo().username)
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

// BookMarking
const bkDb = path.join(__dirname + '\\databases\\','bookmarks.json')
const bk = exports.bk =()=>{
//    let fl = fs.readFileSync(bkDb)
   return JSON.parse(fs.readFileSync(bkDb))
}
// const fsPromise = fs.promises
const addBk = exports.addBk = (data)=>{
let rt;
    fs.writeFileSync(bkDb,data)

        // rt= `<i class="fas fa-check    text-success"></i>`
    // }else {rt =`<i class="fa fa-times text-warning" aria-hidden="true"></i>`}
        // rt =`<i class="fa fa-times text-warning" aria-hidden="true"></i>`
return `<i class="fas fa-check    text-success"></i>`
}
// console.log(JSON.parse(fs.readFileSync(bk)))
