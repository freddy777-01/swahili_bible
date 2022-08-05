const path = require("path");
const fs = require("fs");
/* 
    >> Agano la kale 1-< 40
    >> Agano jipya 40-66
    */
const bible = (exports.bible = {
  bibleCont: () => {
    return fs.readFileSync(
      path.join(__dirname + "/scripture/", "SwaBible.txt")
    );
  },
  bibleTitle: () => {
    return fs.readFileSync(path.join(__dirname + "/titles/", "Swahili.txt"));
  },
  bibleRow: () => {
    return bible.bibleCont().toString().split("\n");
  },
  bibleCols: () => {
    let cols = [];
    bible.bibleRow().forEach((el) => {
      cols.push(el.split("\t"));
    });
    return cols;
  },
  titleNums: () => {
    let titleNums = [];
    let titleRow = bible.bibleTitle().toString().split("\n");
    titleRow.forEach((el) => {
      titleNums.push(el.split("\t"));
    });
    return titleNums;
  },
  tafutaSura: (kt) => {
    let temp = [];
    let suraAr = [];
    temp.splice(0, temp.length); //here am clearing the temp elements before updating them
    bible.bibleCols().forEach((el) => {
      let kitabu = el[0][0] + "" + el[0][1];
      if (kitabu === kt) {
        temp.push(el[1]);
        kitabuTemp = kitabu;
      }
    });
    suraAr = temp.filter((value, index) => temp.indexOf(value) === index);
    /* temp.forEach(el =>{
        if (!suraAr.includes(el)) {
            suraAr.push(el)
        }
    }) */
    // console.log(kitabuTemp);
    return suraAr;
  },
  oldTestamentNum: () => {
    let tempNum = [];

    bible.bibleCols().forEach((el) => {
      tempNum.push(el[0]);
    });

    let tempTesta = [];
    tempNum.forEach((el) => {
      // col_1.push(el[2])
      if (el[2] === "O") {
        tempTesta.push(el);
      }
    });
    // creating unique first colmn numbers
    let oldTesta = [];
    oldTesta = tempTesta.filter(
      (value, index) => tempTesta.indexOf(value) === index
    );
    return oldTesta;
  },
  newTestamentNum: () => {
    let tempNum = [];

    bible.bibleCols().forEach((el) => {
      tempNum.push(el[0]);
    });

    let tempTesta = [];
    tempNum.forEach((el) => {
      // col_1.push(el[2])
      if (el[2] === "N") {
        tempTesta.push(el);
      }
    });
    // creating unique first colmn numbers
    let newTesta = [];
    newTesta = tempTesta.filter(
      (value, index) => tempTesta.indexOf(value) === index
    );
    return newTesta;
  },
  bibleVerses: (kt, suraNum) => {
    let verses = [];
    verses.splice(0, verses.length);
    bible.bibleCols().forEach((el) => {
      let kitabu = el[0][0] + "" + el[0][1];
      if (kitabu === kt) {
        if (el[1] === suraNum) {
          verses.push(el);
        }
      }
    });
    return verses;
  },
  oldTestamentTitles: () => {
    let arrayOfTitles = [];
    let sg;
    bible.oldTestamentNum().forEach((eln) => {
      if (eln[1] > 10) {
        sg = eln[1];
      } else {
        sg = eln[0] + eln[1];
      }
      bible.titleNums().forEach((el) => {
        if (el[0] > 0) {
          if (Number(sg) >= 1 || Number(sg) < 40) {
            if (Number(el[0]) === Number(sg)) {
              if (el[0] < 10) {
                arrayOfTitles.push(el);
              } else {
                arrayOfTitles.push(el);
              }
            }
          }
        }
      });
    });
    return arrayOfTitles;
  },
  newTestamentTitles: () => {
    let arrayOfTitles = [];
    let sg;
    bible.newTestamentNum().forEach((eln) => {
      if (eln[1] > 10) {
        sg = eln[1];
      } else {
        sg = eln[0] + eln[1];
      }
      bible.titleNums().forEach((el) => {
        if (el[0] > 0) {
          if (Number(sg) >= 40 || Number(sg) <= 66) {
            if (Number(el[0]) === Number(sg)) {
              if (el[0] < 10) {
                arrayOfTitles.push(el);
              } else {
                arrayOfTitles.push(el);
              }
            }
          }
        }
      });
    });
    return arrayOfTitles;
  },
});
// export default bible;
/*
>>THIS IS A DELETED CODE FOR AUTOMATIC TESTAMENT QUERY 
testaments:(ts)=>{
    
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
    let testa=[]
    testa.splice(0,testa.length)
    testa = tempTesta.filter((value,index)=> tempTesta.indexOf(value) === index)
    return testa
    }, */
