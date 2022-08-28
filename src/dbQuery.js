const { dbcon } = require("./db");

exports.notes = {
  saveNote: (title, note, date, deleted) => {
    let tm =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const stmt = dbcon.prepare(
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
    return dbcon.prepare("SELECT * FROM mynotes").all();
  },
  readNote: (id) => {
    return dbcon
      .prepare("SELECT title,notes FROM mynotes WHERE id=?")
      .all(`${id}`);
  },
  deleteANote: (id) => {
    const stmt = dbcon.prepare("DELETE FROM mynotes WHERE id = ?");
    return stmt.run(id);
  },
  deleteAllNotes: () => {
    return dbcon.prepare("DELETE FROM mynotes").run();
  },
};

exports.highlighter = {
  highlight: (key, color) => {
    const stmt = dbcon.prepare(
      "INSERT INTO highlights(address,colors) VALUES(?,?)"
    );
    return stmt.run(key, color);
  },
  getHighlight: (key) => {
    return dbcon.prepare("SELECT * FROM highlights WHERE address = ?").get(key);
  },
  updateHighlight: (key, color) => {
    return dbcon
      .prepare(
        `UPDATE highlights SET colors='${color}' WHERE address = '${key}'`
      )
      .run();
  },
  allHighlights: (key) => {
    return dbcon.prepare("SELECT * FROM highlights WHERE address = ?").all(key);
  },
  deHighlight: (key) => {
    return dbcon.prepare("DELETE FROM highlights WHERE address=?").run(key);
  },
};

exports.bookmarking = {
  addBkmk: (bkmk) => {
    return dbcon.prepare("INSERT INTO bookmarks(bookmark) VALUES(?)").run(bkmk);
  },
  getBkmks: () => {
    return dbcon.prepare("SELECT * FROM bookmarks").all();
  },
  deleteBkmk: (id) => {
    return dbcon.prepare("DELETE FROM bookmarks WHERE id =?").run(id);
  },
};
