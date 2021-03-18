// const remote = require('electron').remote;
// const preload = require('./preload.js');
const bible = require('./bibleQuery')

const view = document.querySelector('#bible-content');
const vitabu =document.querySelector('#vitabu');
const txtArea = document.querySelector('textarea');
const sura = document.querySelector('#sura')
const agano = document.querySelector('#agano')
const clearBibleView = ()=> view.innerHTML=""

// DIPLAYING BIBLE VERSES
const bibleVerses = (kt,suraNum)=>{
    let verses = bible.bible.bibleVerses(vitabu.value,sura.value)
    clearBibleView()
    verses.forEach(el => {
        // console.log(el);
        view.innerHTML +=`<p class="verse-content"><span class="verse">${el[2]}</span>${el[3]}</p>`
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
    // txtArea.value =null;
    sura.innerHTML =""
/* suraAr.forEach(el => {
    txtArea.value += el+'\n'
}); */
        
        suraAr.forEach(el =>{
            sura.innerHTML +=`<option value="${el}">${el}</option>`;

        })
    // console.log(kitabuTemp);
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