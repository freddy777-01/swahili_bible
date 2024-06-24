import oldTestament from '../bible/agano-kale.json'
import newTestament from '../bible/agano-jipya.json'
// eslint-disable-next-line no-unused-vars
const bible = {
  oldTestamentBooks: oldTestament.BIBLEBOOK,
  newTestamentBooks: newTestament.BIBLEBOOK,
  getTestamentTitles: (bibleBooks) => {
    let titles = []
    bibleBooks.forEach((bibleBook) =>
      titles.push({ book_number: bibleBook['book_number'], book_name: bibleBook['book_name'] })
    )
    return titles
  },
  getChapters: (bookNumber, bibleBooks) => {
    let chapters = []
    bibleBooks.forEach((bibleBook) => {
      if (bibleBook['book_number'] === bookNumber) {
        bibleBook['CHAPTER'].forEach((chapter) =>
          chapters.push({
            value: chapter['chapter_number'],
            label: `sura ya ${chapter['chapter_number']}`
          })
        )
      }
    })
    return chapters
  },
  getVerses: function (chapterNumber, bookNumber, bibleBooks) {
    let verses = []
    bibleBooks.forEach((bibleBook) => {
      if (bibleBook['book_number'] === bookNumber) {
        bibleBook['CHAPTER'].forEach((chapter) => {
          if (chapter['chapter_number'] === chapterNumber) {
            verses = chapter['VERSES']
          }
        })
      }
    })
    return verses
  },
  OldTestament: {
    titles: function () {
      return bible.getTestamentTitles(bible.oldTestamentBooks)
    },
    chapters: function (bookNumber) {
      return bible.getChapters(bookNumber, bible.oldTestamentBooks)
    },
    verses: function (chapterNumber, bookNumber) {
      return bible.getVerses(chapterNumber, bookNumber, bible.oldTestamentBooks)
    }
  },
  NewTestament: {
    titles: function () {
      return bible.getTestamentTitles(bible.newTestamentBooks)
    },
    chapters: function (bookNumber) {
      return bible.getChapters(bookNumber, bible.newTestamentBooks)
    },
    verses: function (chapterNumber, bookNumber) {
      return bible.getVerses(chapterNumber, bookNumber, bible.newTestamentBooks)
    }
  }
}
export { bible }
