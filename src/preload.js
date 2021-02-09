const path = require('path');
const fs = require('fs');


// console.log(path.join(__dirname + '\\bibles\\','swahili_utf8.txt'))
const bibleCont = exports.bibleCont = ()=>{
    const fileN = path.join(__dirname + '\\Bibles\\','Swa2Bible.txt')
   return fs.readFileSync(fileN);
}

const bibleTitle = exports.bibleTitle = ()=>{
    const fileN = path.join(__dirname + '\\Titles\\','Swahili.txt')
    return fs.readFileSync(fileN);
}