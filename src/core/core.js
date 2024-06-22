import oldTestament from '../bible/agano-kale.json'
import newTestament from '../bible/agano-jipya.json'
// eslint-disable-next-line no-unused-vars
const bible = {
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
        bibleBook['CHAPTER'].forEach((chapter) => chapters.push(chapter['chapter_numbers']))
      }
    })
    return chapters
  },
  getVerses: function (chapterNumber, bookNumber, bibleBooks) {
    let verses = []
    bibleBooks.forEach((bibleBook) => {
      if (bibleBook['book_number'] === bookNumber) {
        bibleBook['CHAPTER'].forEach((chapter) => {
          if (chapter['chapter_number'] === chapterNumber) verses = chapter['VERSES']
        })
      }
    })
    return verses
  },
  OldTestament: {
    book: oldTestament.BIBLEBOOK,
    titles: function () {
      return bible.getTestamentTitles(bible.OldTestament.book)
    },
    chapters: function (bookNumber) {
      return bible.getChapters(bookNumber, bible.OldTestament.book)
    },
    verses: function (chapterNumber, bookNumber) {
      return bible.getVerses(chapterNumber, bookNumber, bible.OldTestament.book)
    }
  },
  NewTestament: {
    book: newTestament.BIBLEBOOK,
    titles: function () {
      return bible.getTestamentTitles(bible.NewTestament.book)
    },
    chapters: function (bookNumber) {
      return bible.getChapters(bookNumber, bible.NewTestament.book)
    },
    verses: function (chapterNumber, bookNumber) {
      return bible.getVerses(chapterNumber, bookNumber, bible.NewTestament.book)
    }
  }
}
export { bible }
