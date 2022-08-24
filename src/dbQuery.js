const dbcon = require("./db");

const notes = (exports.notes = {
  saveNote: (title, note, date, deleted) => {
    let tm =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const stmt = dbcon.dbcon.prepare(
      "INSERT INTO mynotes(title,notes,created_at,deleted) VALUES(?,?,?,?)"
    );
    return stmt.run(title, note, `${date} Time-${tm}`, deleted);
  },
  getNotes: () => {
    let results = null;
    // const stmt = dbcon.dbcon.prepare("SELECT * FROM mynotes");
    // dbcon.all("SELECT * FROM mynotes", (err, rows) => {
    //   if (err) console.log("there is error");
    //   results = rows;
    // });
    // console.log(stmt.all());
    return dbcon.dbcon.prepare("SELECT * FROM mynotes").all();
  },
  readNote: (id) => {
    return dbcon.dbcon
      .prepare("SELECT title,notes FROM mynotes WHERE id=?")
      .all(`${id}`);
  },
  deleteANote: (id) => {
    const stmt = dbcon.dbcon.prepare("DELETE FROM mynotes WHERE id = ?");
    return stmt.run(id);
  },
  deleteAllNotes: () => {
    return dbcon.dbcon.prepare("DELETE FROM mynotes").run();
  },
});

exports.highlighter = {
  highlight: (key, color) => {
    const stmt = dbcon.dbcon.prepare(
      "INSERT INTO highlights(address,colors) VALUES(?,?)"
    );
    return stmt.run(key, color);
  },
  getHighlight: (key) => {
    return dbcon.dbcon
      .prepare("SELECT * FROM highlights WHERE address = ?")
      .get(key);
  },
  updateHighlight: (key, color) => {
    return dbcon.dbcon
      .prepare(
        `UPDATE highlights SET colors='${color}' WHERE address = '${key}'`
      )
      .run();
  },
  allHighlights: (key) => {
    return dbcon.dbcon
      .prepare("SELECT * FROM highlights WHERE address = ?")
      .all(key);
  },
  deHighlight: (key) => {
    return dbcon.dbcon
      .prepare("DELETE FROM highlights WHERE address=?")
      .run(key);
  },
};
