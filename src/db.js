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
    dbm.dbcon.run(sql,(results,err)=>{
      if(results) console.log(results);
     if(err) console.log(err);
    })
}
createTb()

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
    rows.forEach(row => {
      if (row.deleted == '1') {
        
        document.querySelector('.note .note-body .view-notes .view-notes-body').innerHTML+=`
        <div class="note-view border rounded mt-1 mb-1 p-1">
        <h4>${row.title}</h4>
        <p>${row.notes}</p>
        <smal><i>${row.created_at}</i></smal>
        <div class="note-view-footer">
        <button class="btn btn-sm btn-outline-info read-note" data-id="${row.id}" onclick="thisNote(${row.id})">Read</button>
        <button class="btn btn-sm btn-outline-dark delete-note" data-id="${row.id}" onclick="toDelete(${row.id})">Delete</button>
        </div>
        </div>
        `
      }
    });
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
/* let dt = new Date()
let td = dt.getDate()+'-'+dt.getMonth()+'-'+dt.getFullYear()
console.log(dt.toDateString()) */
/* try {
            
    const knex = require('knex')({
        client: 'sqlite3',
        connection: {
          filename: './database/notes.db',
        },
      });
    
    //   creating table
    await knex.schema
      .createTable('myNotes',table=>{
          table.increments('id')
          table.string('title')
          table.text('notes')
          table.timestamp('created_at')
      })
} catch (error) {
    console.log(error);
} */