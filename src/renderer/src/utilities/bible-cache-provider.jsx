/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

const BibleCache = createContext()
const BibleCacheProvider = ({ children }) => {
  const oldTestament = window.bible.OldTestament
  const newTestament = window.bible.NewTestament
  const [bookNumber, setBookNumber] = useState('1')
  const [bookKey, setBookKey] = useState() // this is used to trigger verses display when Testament Book is clicked
  const [verses, setVerses] = useState([])
  const [chapterNumber, setChapterNumber] = useState('1')
  const [chapters, setChapters] = useState([])
  const [testament, setTestament] = useState('oldTestament')
  const [oldTestamentBooks, setOldTestamentBooks] = useState(window.bible.OldTestament.titles())
  const [newTestamentBooks, setNewTestamentBooks] = useState(window.bible.NewTestament.titles())

  useEffect(() => {
    if (testament === 'oldTestament') {
      setChapters(oldTestament.chapters(bookNumber))
    }
    if (testament === 'newTestament') {
      setChapters(newTestament.chapters(bookNumber))
    }
  }, [bookNumber])
  useEffect(() => {
    if (testament === 'oldTestament') {
      setVerses(oldTestament.verses(chapterNumber, bookNumber))
    }
    if (testament === 'newTestament') {
      setVerses(newTestament.verses(chapterNumber, bookNumber))
    }
  }, [chapterNumber, bookKey])
  // console.log(bookNumber)
  return (
    <BibleCache.Provider
      value={{
        setBookNumber,
        chapters,
        setTestament,
        verses,
        setChapterNumber,
        oldTestamentBooks,
        newTestamentBooks,
        setBookKey
      }}
    >
      {children}
    </BibleCache.Provider>
  )
}

export { BibleCache, BibleCacheProvider }
