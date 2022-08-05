const dbcon = require("./db");

const notes = (exports.notes = {
  saveNote: () => {
    let tm =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    let sql = `INSERT INTO mynotes(title,notes,created_at,deleted) 
  VALUES('${title}','${notes}','${date} Time-${tm}','${deleted}')`;
    dbCon.run(sql, (err) => {
      if (err) return err;
      msgBox.innerHTML = `<p class="text-success">Notes Saved </p>`;
      notes.getNotes();
      return "notes saved";
    });
  },
  getNotes: () => {
    let results = null;
    dbcon.all("SELECT * FROM mynotes", (err, rows) => {
      if (err) console.log("there is error");
      results = rows;
    });
    return results;
  },
});
