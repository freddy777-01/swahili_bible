// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const vitabu = document.querySelector(".input-group .vitabu-list #vitabu");
const sura = document.querySelector(".input-group .sura-num #sura");
const versesView = document.querySelector(".main-body .verse");
const maagano = document.querySelector(".agano-list #agano");
const clearBibleView = () => (versesView.innerHTML = "");
let tempBookNum, tempSuraNum;

const alertFunction = (message, type, status) => {
  $(".alert-container").html(
    `<div class="alert alert-${type} alert-dismissible fade show">
      <p>
          <strong>${
            status[0].toUpperCase() + status.substring(1)
          }!</strong> ${message}
      </p>
      <button type="button" class="btn-close" data-bs-dismiss="alert">
          <img src="images/close_black_24dp.svg" alt="">
      </button>
    </div>`
  );
  setTimeout(() => {
    $(".note .alert-container").html("");
  }, 2000);
};

const getBibleVerses = (book, suraNum) => {
  let verses = bible.getVerses(book, suraNum);
  clearBibleView();
  verses.forEach((el) => {
    let key = (el[0][0] + "" + el[0][1] + "" + el[1] + "" + el[2]).toString(); //this key combines kitabu-aya-mstari

    versesView.innerHTML += `<p class="verse-content" data-key="${
      el[0][0] + "" + el[0][1] + "" + el[1] + "" + el[2]
    }"><span class="verse">${el[2]}</span>
        <span class="verse-text rounded" >${el[3]}</span>
        <span class="tooltp ml-2">
        <i class="fas fa-highlighter    " onclick="highlighta('${key}','#ffdb3b')"></i>
        <span class="tooltiptext">
        <span class="colors" style="background-color:#f5e068f5" data-color="#f5e068f5" data-key="${key}"></span>
        <span class="colors" style="background-color:#0891ec" data-color="#0891ec" data-key="${key}"></span>
        <span class="colors" style="background-color:#ea08ff" data-color="#ea08ff" data-key="${key}"></span>
        <span class="remove-color"><i class="fas fa-trash-alt mr-2" onclick="removeColor('${key}')"></i></span>
        </span>
        </span>
        </p>`;

    highlighter.allHighlights(key).forEach((h) => {
      // console.log(h.address);
      highlightColor(h.address, h.colors);
    });
  });
};

const getSuraForBook = (kitabuNum) => {
  let sur = bible.getSura(kitabuNum);
  sur.forEach((el) => {
    sura.innerHTML += `<option value="${el}">${el}</option>`;
  });
  getBibleVerses(vitabu.value, sura.value);
};

/* Getting the old and new Testament books */
const getOldTestaments = () => {
  vitabu.innerHTML = "";
  bible.getOldTestamentTitles().forEach((el) => {
    if (el[0] < 10) {
      vitabu.innerHTML += `<option value ="${0 + el[0]}">${el[1]}</option>`;
    } else {
      vitabu.innerHTML += `<option value ="${el[0]}">${el[1]}</option>`;
    }
  });
};
const getNewTestaments = () => {
  vitabu.innerHTML = "";
  bible.getNewTestamentTitles().forEach((el) => {
    vitabu.innerHTML += `<option value ="${el[0]}">${el[1]}</option>`;
  });
};
getOldTestaments(); /* this displays bible verses by default */
/*End Getting the old and new Testament books */

getSuraForBook(vitabu.value);

$(".input-group .sura-num #sura").change(function (e) {
  getBibleVerses(vitabu.value, sura.value);
});
// sura.addEventListener("change", (e) => {
//   getBibleVerses(vitabu.value, sura.value);
// });

$(".agano-list #agano").change(function (e) {
  if (e.target.value === "N") getNewTestaments();
  else getOldTestaments();
  getSuraForBook(vitabu.value);
});

$(".input-group .vitabu-list #vitabu").change(function (e) {
  if (sura.innerHTML != "") sura.innerHTML = null;
  getSuraForBook(e.target.value);
});

//open the note book
const openNoteBook = () => {
  // console.log("Note Book Opened");
  disclose.noteBook();
};

/* *** highlighting functionality *** */

function highlightColor(key, color = null) {
  let verses = document.querySelectorAll(".verse .verse-content");
  verses.forEach((verse) => {
    // console.log(verse);
    if (verse.dataset.key.toString() === key) {
      // console.log(key);
      verse.children[1].style.backgroundColor = color;
    }
  });
  // console.log(color);
}
function highlighta(key, c) {
  if (highlighter.getHighlight(key) == undefined) {
    if (highlighter.highlight(key, c).changes < 0)
      alertFunction("There was an error", "danger", "failed");
  } else {
    if (highlighter.updateHighlight(key, c).changes < 0)
      alertFunction("There was an error", "danger", "failed");
  }
  highlightColor(key, c);
}

// Delete highlight color
function removeColor(key) {
  highlightColor(key, null);
  if (highlighter.deHighlight(key).changes < 0)
    alertFunction("There was an error", "danger", "failed");
}
//change highlight color
$(document).on("click", ".colors", (e) => {
  // console.log(e.target);
  highlighta(e.target.dataset.key, e.target.dataset.color);
  highlightColor(e.target.dataset.key, e.target.dataset.color);
});

/* *** End of highlighting functionality*** */

/**
 * The "window.onbeforeunload" function override the closing window functionality
 * in order to manually invoke the close() for both mainWindow and noteBook windows
 */
window.onbeforeunload = (e) => {
  // console.log("I do not want to be closed");
  e.preventDefault();
  disclose.closeAllWin();
  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  // e.returnValue = true;
};
