// const { notes } = require("./dbQuery");

// const { notes } = require("./dbQuery");

const hideWin = () => {
	win.hide();
};

// Text Editor
var TextEditor = new Quill("#snow-container", {
	modules: {
		toolbar: [
			[
				{
					font: [],
				},
			],
			[
				{
					header: [1, 2, 3, false],
				},
			],
			["bold", "italic", "underline"],
			[
				{
					list: "ordered",
				},
				{
					list: "bullet",
				},
			],
			[
				{
					color: [],
				},
				{
					background: [],
				},
			],
			[
				{
					align: [],
				},
			],
			["clean"],
		],
	},
	placeholder: "Compose an your Text...",
	theme: "snow",
});

var NoteReader = new Quill("#read-body", {
	placeholder: "",
	theme: "bubble",
});
NoteReader.enable(false);
// This function is for alert(Notifications)
const alertFunction = (message, type, status) => {
	$(".note .alert-container").html(
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

// Getting the new inserted notes
const getAllNotes = () => {
	$(".note-body .view-notes .view-notes-body").html("");

	notes.getNotes().forEach((note) => {
		$(".note-body .view-notes .view-notes-body").append(
			`
              <div class="note-view border rounded mt-1 mb-1 p-1">
              <h4>${note.title}</h4>
              <p class="noteBg">${note.notes}</p>
              <small><i>${note.created_at}</i></small>
              <div class="note-view-footer">
              <button class="btn btn-sm btn-outline-info read-note" data-id="${note.id}">Read</button>
              <button class="btn btn-sm btn-outline-dark delete-note" data-id="${note.id}">Delete</button>
              </div>
              </div>
              `
		);
	});
};
$(".nav #my-notes").click(() => {
	getAllNotes();
});

// View the Selected Note'
$(document).on("click", ".read-note", (e) => {
	$(".note-body .read-notes .read h4").html(
		`
    ${notes.readNote(e.target.dataset.id)[0].title}
    `
	);
	NoteReader.setContents([
		JSON.parse(notes.readNote(e.target.dataset.id)[0].notes),
	]);
	showPanel(2);
});

// Deleting A Note
$(document).on("click", ".delete-note", function (e) {
	e.preventDefault();
	// console.log(e.target);
	if (notes.deleteANote(e.target.dataset.id).changes > 0) {
		getAllNotes();
		alertFunction("Note Deleted", "success", "success");
		// showPanel(1);
	} else {
		alertFunction("Deleting Failed", "danger", "failed");
	}
});

// Deleting All Notes
$(".note .note-body .view-notes .delete-notes").click(function (e) {
	// e.preventDefault();
	// console.log(notes.deleteAllNotes());
	if (notes.deleteAllNotes().changes > 0) {
		getAllNotes();
		alertFunction("All notes deleted", "success", "success");
	} else {
		// getAllNotes();
		alertFunction("Deleting Failed", "danger", "failed");
	}
});

// Saving Notes: Get the submitted data from form
$(".note-body .take-note form").submit(function (e) {
	e.preventDefault();
	// console.log($(this).serializeArray()[0]);
	$(".note-body .take-note form #note-texts").val(
		JSON.stringify(TextEditor.getContents())
	);
	if (
		notes.saveNote(
			$(this).serializeArray()[0].value,
			$(this).serializeArray()[1].value,
			new Date().toDateString(),
			1
		).changes > 0
	) {
		alertFunction("Note Saved", "success", "success");
	} else {
		alertFunction("Unable to Saved #try again", "danger", "failed");
	}
});

//Editor
// const editor = new win.editor()({ holder: "editor-container" });
