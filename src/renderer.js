// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering

// process.
const vitabu = document.querySelector(".input-group .vitabu-list #vitabu");
const sura = document.querySelector(".input-group .sura-num #sura");
const versesView = document.querySelector(".main-body .verse");
const agano = document.querySelector(".agano-list #agano");
const bkmkBody = document.querySelector(
	".bookmark-modal .modal-content .modal-body"
);
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
		$(".alert-container").html("");
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
	sura.innerHTML = "";
	bible.getSura(kitabuNum).forEach((el) => {
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

//The below code listens to change of agano dropdown menu change
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

/**
 *I have used "function" keyword do declare the below functions in order to use javascript's
 *Hoisting functionality, which allows to call a function before it's declaration
 */

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

/* *** Bookmarking *** */
function getBookmarks() {
	bkmkBody.innerHTML = "";
	let tempBkmk = bookmark.getbkmks();
	if (tempBkmk.length > 0) {
		tempBkmk.forEach((bk) => {
			let tempBkmk = [];
			tempBkmk.slice(0, tempBkmk.length);
			tempBkmk.push(JSON.parse(bk.bookmark).Kitabu);
			tempBkmk.push(JSON.parse(bk.bookmark).Sura);
			tempBkmk.push(JSON.parse(bk.bookmark).Agano);

			bkmkBody.innerHTML += `
      <div class="bookmark">
      <div class="bk-text" onclick="viewBook(this)" data-bkmk ="${tempBkmk}">
      ${bible.getTitleName(JSON.parse(bk.bookmark).Kitabu)}; Sura: ${
				JSON.parse(bk.bookmark).Sura
			}</div>
      <div class="trash" data-id="${
				bk.id
			}" onclick="deleteBkmk(this)"><i class="fas fa-trash-alt mr-2"></i></div>
      </div>`;
		});
	} else {
		bkmkBody.innerHTML = `<div>Bookmarks not found</div>`;
	}
}
getBookmarks();
$(".add-to-bookmark").click(function (e) {
	e.preventDefault();
	let bkObj = {
		Kitabu: vitabu.value,
		Sura: sura.value,
		Agano: agano.value,
	};
	if (bookmark.addbkmk(`${JSON.stringify(bkObj)}`).changes > 0) {
		alertFunction("Bookmark Added", "success", "succcess");
		getBookmarks();
	}
});
const viewBook = (el) => {
	let j = el.dataset.bkmk;
	let kitabu = j[0] + "" + j[1],
		sra,
		agno;
	if (j.length == 8) {
		sra = j[3] + "" + j[4] + "" + j[5];
		agno = j[7];
	}
	if (j.length == 7) {
		sra = j[3] + "" + j[4];
		agno = j[6];
	}
	if (j.length == 6) {
		sra = j[3];
		agno = j[5];
	}

	agano.value = agno;
	agno === "N" ? getNewTestaments() : getOldTestaments();
	getSuraForBook(kitabu);
	vitabu.value = kitabu;
	sura.value = sra;
	getBibleVerses(kitabu, sra);
};
const deleteBkmk = (el) => {
	if (bookmark.deletebkmk(el.dataset.id).changes > 0) {
		alertFunction("Bookmark Deleted", "success", "succcess");
		getBookmarks();
	} else {
		alertFunction("Try Again", "danger", "failed");
	}
};
/* *** End Bookmarking *** */

/* Open a Link to External browser */
$("#external-link").click(function (e) {
	openLink.open("https://t.me/Mk_7_6");
});
/* End Opening a link to external browser */

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
