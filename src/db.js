// const { bible } = require('./bibleQuery.js');
const dbm = require('./preload.js')

/* 
>>> THESE ARE QUERY METHODES for sqlite3.js
•	run: used to create or alter tables and to insert or update table data
•	get: select a single row of data from one or more tables
•	all: select multiple rows of data from one or more tables
  each: selects multiple rows of data and return each row as an boject

*/
// dbm.newTb.ct()
/* (function(){
  dbm.dbcon.run('DROP TABLE mynotes',(results,err)=>{
    if(results) console.log(results);
    if(err) console.log(err);
   })
})(); */

let msgBox =document.querySelector('.note .msg')

const createTb = ()=>{
  const sql = `CREATE TABLE IF NOT EXISTS mynotes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    notes TEXT,
    created_at DATETIME,
    deleted INT(1))`;
  const bkTable =`CREATE TABLE IF NOT EXISTS bookmarks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookmark VARCHAR(20)
  )`;
  const highlight =`CREATE TABLE IF NOT EXISTS highlights(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address VARCHAR(20),
    colors VARCHAR(15)
  )`;

  dbm.dbcon.serialize(()=>{

    dbm.dbcon.run(sql,(results,err)=>{
      if(results) console.log(results);
      if(err) console.log(err);
    }).run(bkTable,(results,err)=>{
      if(results) console.log(results);
      if(err) console.log(err);
    }).run(highlight,(results,err)=>{
      if(results) console.log(results);
      if(err) console.log(err);
    })
  })
}
createTb()

// ADDING BOORKMARK
/* const bkmark = document.querySelector('nav #bookmark')
const vitab =document.querySelector('#vitabu');
const sura = document.querySelector('#sura')
const agano = document.querySelector('#agano') */
/* BoorkMarking */

// >>getting book title
const bookTitle =(titleNum)=>{
  const titles = bible.bible.titleNums()
  // console.log(titles);
  let temp,title_name
  if (titleNum[0] == 0) { //Filtering the title id
    temp = titleNum[1]
  }else {temp = titleNum}

  titles.forEach(title => {
    if(title[0] >0){
      if (Number(title[0] == Number(temp))) {
        // console.log(title[1]);
        title_name = title[1]
      }
    }
    // console.log(title);
  });
 return title_name
}
// bookTitle()
// >>End of book title

    // checking if there is any data in bookmark DB
    const bkManager ={
      selectBookmarks:()=>{
        let ag = null
        bkContents.innerHTML=''
        dbm.dbcon.all('SELECT * FROM bookmarks LIMIT 5',(err,rows)=>{
          if(err) console.log(err);
          if (rows.length > 0) {
            let temp =[]
            rows.forEach(row => {
              temp.splice(0,temp.length)
              temp.push(JSON.parse(row.bookmark).Kitabu)
               temp.push(JSON.parse(row.bookmark).Sura)
               temp.push(JSON.parse(row.bookmark).Agano)
              // console.log(row.bookmark)
              if (JSON.parse(row.bookmark).Agano == 'O') ag=' La Kale'
              else ag = 'Jipya'
              bkContents.innerHTML +=`
              <div class="d-flex">
              <span class="this-bookmark mr-2" onclick="bkFunction(this)" data-bmk="${temp}">
              ${bookTitle(JSON.parse(row.bookmark).Kitabu)}, Sura: ${JSON.parse(row.bookmark).Sura}
              </span>
              <span class="delete-bookmark" onclick="deleteBookmark(${row.id})">
              <i class="fas fa-times    "></i>
              </span>
              </div>
              `
              
            });
          }else{
            bkContents.innerHTML = 'Add to Bookmark'
          }
        })
      },
      deleteBookmark:(id)=>{
        dbm.dbcon.run(`DELETE FROM bookmarks WHERE id ='${id}'`,(err)=>{
          if(err){
           return false
          }
        })
      }
    }
    bkManager.selectBookmarks() //This files the bookmark content after pageloads
bkmark.onclick=()=>{
    let bkObj = {
        Kitabu:vitabu.value,
        Sura:sura.value,
        Agano:agano.value
    }
    let sql = `INSERT INTO bookmarks(bookmark) VALUES('${JSON.stringify(bkObj)}')`;

    dbm.dbcon.all('SELECT COUNT(bookmark) AS bkNum FROM bookmarks',(err,rows)=>{
      // console.log(rows[0].bkNum)
      if (rows[0].bkNum > 4) {
        document.querySelector('nav #bookmark #bk-msg').innerHTML = `<i class="fas fa-times    text-danger"></i>`
      }else{
        dbm.dbcon.run(sql,(err)=>{
          if (err) {
            
            document.querySelector('nav #bookmark #bk-msg').innerHTML = `<i class="fas fa-times    text-danger"></i>`
          }
        })

        document.querySelector('nav .dropdown #bookmark #bk-msg').innerHTML = `<i class="fas fa-check    text-success"></i>`
        bkManager.selectBookmarks()
      }
      setTimeout(() => {
        document.querySelector('nav .dropdown #bookmark #bk-msg').innerHTML=''
      }, 3000);
    })
    
    // console.log(bkManager.selectBookmarks())
}
/* End Of BookMaking */

// INPUT DATA TO THE DATABASE
const insertData = (title,notes,date,deleted)=>{
  let tm = new Date().getHours() +':'+new Date().getMinutes()+':'+new Date().getSeconds();
  let sql =`INSERT INTO mynotes(title,notes,created_at,deleted) 
  VALUES('${title}','${notes}','${date} Time-${tm}','${deleted}')`;
  dbm.dbcon.run(sql,(err)=>{
    if(err) console.log(err);
    msgBox.innerHTML=`<p class="text-success">Notes Saved </p>`
    setTimeout(() => {
      msgBox.innerHTML=''
    }, 3000);
    allData()
  })
};

// SELECTING ALL NOTES
const allData = ()=>{
  // document.querySelector('.note').style.overflow='scroll'
  document.querySelector('.note .note-body .view-notes .view-notes-body').innerHTML=''
  dbm.dbcon.all('SELECT * FROM mynotes',(err,rows)=>{
    if(err) console.log('there is error');
    // console.log(rows);
    if (rows.length != 0) {
      
      rows.forEach(row => {
        if (row.deleted == '1') {
          
          document.querySelector('.note .note-body .view-notes .view-notes-body').innerHTML+=`
          <div class="note-view border rounded mt-1 mb-1 p-1">
          <h4>${row.title}</h4>
          <p class="noteBg">${row.notes}</p>
          <smal><i>${row.created_at}</i></smal>
          <div class="note-view-footer">
          <button class="btn btn-sm btn-outline-info read-note" data-id="${row.id}" onclick="thisNote(${row.id})">Read</button>
          <button class="btn btn-sm btn-outline-dark delete-note" data-id="${row.id}" onclick="toDelete(${row.id})">Delete</button>
          </div>
          </div>
          `
        }
      });
    }else{
      document.querySelector('.note .note-body .view-notes .view-notes-body').innerHTML=`
      <h3 class="m-4">You Have No Notes💭💭💭</h3>
      `
    }
  })
}
allData()

// DELETING NOTES
const deleteNote = (id)=>{
  dbm.dbcon.run(`DELETE FROM mynotes WHERE id ='${id}'`,(err)=>{
    if(err){
      msgBox.innerHTML=`<p class="text-danger">${err}</p>`
      setTimeout(() => {
        msgBox.innerHTML=''
      }, 3000);
    }
    msgBox.innerHTML=`<p class="text-danger">Messege Deleted !!!</p>`
      setTimeout(() => {
        msgBox.innerHTML=''
      }, 3000); 
  })
}

// DELETE ALL DATA
const deleteAll = ()=>{
  dbm.dbcon.run(`DELETE FROM mynotes`,(err)=>{
    if(err){
      msgBox.innerHTML=`<p class="text-danger">${err}</p>`
      setTimeout(() => {
        msgBox.innerHTML=''
      }, 3000);
    }
    msgBox.innerHTML=`<p class="text-danger">All Data Deleted !!!</p>`
      setTimeout(() => {
        msgBox.innerHTML=''
      }, 3000); 
  })
}


// READE NOTES
const readNote = (id)=>{
  document.querySelector('.note .note-body .read-notes').innerHTML=''
  dbm.dbcon.get(`SELECT title,notes FROM mynotes WHERE id='${id}'`,(err,row)=>{
    if (err) {
      msgBox.innerHTML=`<p class="text-danger">${err}</p>`
      setTimeout(() => {
        msgBox.innerHTML=''
      }, 3000);
    } else {
      document.querySelector('.note .note-body .read-notes').innerHTML=`
      <div>
      <h4>${row.title}</h4>
      <div>
      ${row.notes}
      </div>
      </div>
      `
    }
  })
}


// Note buttons and Text
  // nav buttons
const myNotes = document.querySelector('.note .nav #my-notes')
const saveBtn = document.querySelector('.note .note-footer #save-btn')
  // Text inputs
const noteTitle = document.querySelector('.note .note-body #note-title')
const notes = document.querySelector('.note .note-body #note-content')

// NOTE VIEWED BUTTONS
let viewnote = document.querySelector('.note .nav #read-note')

saveBtn.addEventListener('click',()=>{
  if (noteTitle.value && notes.value) {
    insertData(noteTitle.value, notes.value,new Date().toDateString(),1)
    console.log('there are values');
  }else{ 
    msgBox.innerHTML=`<p class="text-danger">Empty Notes!!!</p>`
    setTimeout(() => {
      msgBox.innerHTML=''
    }, 3000);
    console.log('one has no values');
  }
})

function thisNote(id) {
  // console.log(id);
  readNote(id)
  viewnote.click()
  // console.log(viewnote.click());
}
function toDelete(id){
  deleteNote(id)
  allData()
}
function toDeleteAll(){
  deleteAll()
  allData()
}
function deleteBookmark(id) {
  bkManager.deleteBookmark(id)
  bkManager.selectBookmarks()
}

/* Hilighting functions */
/* const highlighted = (key,color)=>{
  dbm.dbcon.all('SELECT address,colors FROM highlights',(err,rows)=>{
    if(err) console.log('there is error');
    if (rows.length != 0) {
      
      rows.forEach(row => {
        if(!(row.address === key)){
          dbm.dbcon.run(`INSERT INTO highlights(address,colors) VALUES('${key}','${color}')`,(err)=>{
            if(err) console.log(err);
            console.log("Text highlighted");
          })

        }
      })
    }
  })
} */

/* End of highlighting functions */