// const remote = require('electron').remote;
const pre = require('./preload.js')
const bible = require('./bibleQuery')

const view = document.querySelector('#bible-content');
const vitabu =document.querySelector('#vitabu');
// const txtArea = document.querySelector('textarea');
const sura = document.querySelector('#sura')
const agano = document.querySelector('#agano')
const bkmark = document.querySelector('nav .dropdown #bookmark') //This is bookmark button
const bkContents = document.querySelector('nav .dropdown .dropdown-content') //this is Bookmark contents
const clearBibleView = ()=> view.innerHTML=""

// DIPLAYING BIBLE VERSES
const bibleVerses = (kt,suraNum)=>{
    let verses = bible.bible.bibleVerses(vitabu.value,sura.value)
    clearBibleView()

  
    verses.forEach(el => {
        let key = (el[0][0]+""+el[0][1]+""+el[1]+""+el[2]).toString() //this key combines kitabu-aya-mstari
        pre.dbcon.get(`SELECT * FROM highlights WHERE address ='${key}'`,(err,row)=>{
            //this block of code gets the hidhlights
            if(err) console.log(err.message);
            if (row) {
                if (row.address === key) {
                    
                    highlight(row.colors,row.address) // this functions is in animate.js
                }
            }
        })
        view.innerHTML +=`<p class="verse-content" data-key="${el[0][0]+""+el[0][1]+""+el[1]+""+el[2]}"><span class="verse">${el[2]}</span>
        <span class="verse-text rounded" >${el[3]}</span>
        <span class="tooltp ml-2">
        <i class="fas fa-highlighter    " onclick="highlighter(this,'#ffdb3b','${key}')"></i>
        <span class="tooltiptext">
        <span class="colors" style="background-color:#ffdb3b" data-color="#ffdb3b" onclick=changeColor(this,"#ffdb3b",'${key}')></span>
        <span class="colors" style="background-color:#0891ec" data-color="#0891ec" onclick=changeColor(this,"#0891ec",'${key}')></span>
        <span class="colors" style="background-color:#ea08ff" data-color="#ea08ff" onclick=changeColor(this,"#ea08ff",'${key}')></span>
        <span class="remove-color"><i class="fas fa-trash-alt mr-2" onclick="removeColor('${key}')"></i></span>
        </span>
        </span>
        </p>`
    });
}

const booksByAgano = (an)=>{
    /* 
    >> Agano la kale 1-< 40
    >> Agano jipya 40-66
    */
   vitabu.innerHTML=""
   let sg;
   an.forEach(eln => {
       if (eln[1] > 10) {
           sg = eln[1]
       }else{ sg = eln[0]+eln[1]}
       bible.bible.titleNums().forEach(el => {
           if (el[0] >0 ) {
               
               if (Number(el[0]) === Number(sg)) {
                //    console.log(sg);
                   if (el[0] < 10) {
                       
                       vitabu.innerHTML+=`<option value="${0+el[0]}">${el[1]}</option>`;
                       
                   }else{
                       vitabu.innerHTML+=`<option value="${el[0]}">${el[1]}</option>`;
                   }
               }
           }
       });
   });
}

booksByAgano(bible.bible.oldTestament()) /* this displays bible verses by default */
// let currentKitabuSura = vitabu.value
const tafutaSura = (kt)=>{
    let suraAr= bible.bible.tafutaSura(kt)
    sura.innerHTML =""
        
        suraAr.forEach(el =>{
            sura.innerHTML +=`<option value="${el}">${el}</option>`;

        })
    bibleVerses(vitabu.value,sura.value)
}

tafutaSura(vitabu.value);
vitabu.addEventListener('change',(e)=>{
    if (sura.innerHTML!="") {
        sura.innerHTML=null;
    }
    // txtArea.value =null;
    tafutaSura(e.target.value);
    // sura.innerHTML="<option>Empty</option>"
})

/* SELECTING BOOKS USING AGANO */
// booksByAgano(bible.bible.testaments(agano.value))

agano.addEventListener('change',(e)=>{
    if(e.target.value === 'N')  booksByAgano(bible.bible.newTestament())
    else booksByAgano(bible.bible.oldTestament())
    tafutaSura(vitabu.value)
})


bibleVerses(vitabu.value,sura.value)
sura.addEventListener('change',(e)=>{
    bibleVerses(vitabu.value,e.target.value)
})


// Selecting From BoorkMark


function bkFunction(b) {
    let j =b.dataset.bmk
    let kitabu =j[0]+""+j[1],sra,agno
    /* let sra =j[3]
    let agano */
    // console.log(j.length)
    if (j.length == 8) {
        sra = j[3]+""+j[4]+""+j[5]
        agno = j[7]
    }
    if (j.length == 7) {
        sra = j[3]+""+j[4]
        agno =j[6]
    }
    if (j.length == 6) {
        sra = j[3]
        agno = j[5]
    }
        agano.value = agno
        if(agno ==='N')  booksByAgano(bible.bible.newTestament());
        else booksByAgano(bible.bible.oldTestament())
  
         tafutaSura(kitabu); //this takes the kitabu value
  
         vitabu.value = kitabu
         sura.value =sra
          bibleVerses(kitabu,sra)
    }
// end of bookmaking


/* Highlighting functionality */
  

const highlighted = (key,color)=>{

    pre.dbcon.all(`SELECT * FROM highlights WHERE address='${key}'`,(err,rows)=>{
      if(err) console.log('there is error');
      console.log(rows.length);
              if (rows.length == 0) {
                
                      pre.dbcon.run(`INSERT INTO highlights(address,colors) VALUES('${key}','${color}')`,(err)=>{
                          if(err) console.log(err);
                          console.log("Text highlighted");
                        })
            }
            pre.dbcon.run(`UPDATE highlights SET colors='${color}' WHERE address = '${key}'`,(err)=>{
                if(err) console.log(err);
                console.log("color updated");
            })
              
          
    })
    // console.log('BIG ERROR');
  }
const deHighlight =(key)=>{ // Deleting highliting
    pre.dbcon.run(`DELETE FROM highlights WHERE address ='${key}'`,(err)=>{
        if(err) console.log(err);
        console.log('color deleted');
    })
}
/* End of HIghlighting functionality */