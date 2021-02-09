const preload = require('./preload.js')
let kitabu;
const bible = exports.bible = {
    bibleCont:()=>{
        return preload.bibleCont();
    },
    bibleTitle:()=>{
        return preload.bibleTitle();
    },
    bibleRow:()=>{
        return bible.bibleCont().toString().split('\n')
    },
    bibleCols:()=>{
        let cols=[]
        bible.bibleRow().forEach(el => {
            cols.push(el.split('\t'))
        });
        return cols
    },
    titleNums:()=>{
        let titleNums=[]
        let titleRow = bible.bibleTitle().toString().split('\n')
        titleRow.forEach(el => {
            titleNums.push(el.split('\t'))
        });
        return titleNums
    },
    tafutaSura:(kt)=>{
        let temp=[];let suraAr=[];
        //  let kitabuTemp;
    temp.splice(0,temp.length) //here am clearing the temp elements before updating them
    bible.bibleCols().forEach(el => {
        let kitabu = el[0][0]+""+el[0][1]
        if(kitabu === kt){
                temp.push(el[1])
                kitabuTemp = kitabu;
        }  
    });
    suraAr = temp.filter((value,index)=> temp.indexOf(value) === index)
    /* temp.forEach(el =>{
        if (!suraAr.includes(el)) {
            suraAr.push(el)
        }
    }) */
    // console.log(kitabuTemp);
    return suraAr
    },
    testaments:(ts)=>{
    /* 
    >> Agano la kale 1-< 40
    >> Agano jipya 40-66
    */
        // let bibleCont = bible.bibleCont().toString().split('\n')
        let tempNum=[]
        
       bible.bibleCols().forEach(el => {
           tempNum.push(el[0])
    });
    
    
    let tempTesta=[]
    tempTesta.splice(0,tempTesta.length)
    tempNum.forEach(el => {
        // col_1.push(el[2])
        if (el[2] === ts) {
            tempTesta.push(el)
        }
    });
    // creating unique first colmn numbers
    let testa=[]
    testa.splice(0,testa.length)
    testa = tempTesta.filter((value,index)=> tempTesta.indexOf(value) === index)
    return testa
    },
    bibleVerses:(kt,suraNum)=>{
        let verses =[]
        verses.splice(0,verses.length)
        bible.bibleCols().forEach(el => {
            let kitabu = el[0][0]+""+el[0][1]
            if(kitabu === kt){
                if (el[1] === sura.value) {
        
                    verses.push(el)
                }
            }  
        });
        return verses
    }
};