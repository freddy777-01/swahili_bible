/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react'
import Testament from '../elements/testament'
import { BibleCache } from '../../utilities/bible-cache-provider'

export default function SideNav() {
  const bibleCache = useContext(BibleCache)
  // useEffect(() => {
  //   bibleCache.setBookNumber(oldTestamentBooks[0].book_number)
  //   bibleCache.setTestament('oldTestament')
  // }, [])
  const getSelectedBookOrigin = (book) => {
    bibleCache.setBookNumber(book.bookNumber)
    bibleCache.setTestament(book.testament)
    bibleCache.setBookKey(book.bookKey)
    // bibleCache.setChapterNumber(bibleCache.chapters[0])
    // console.log(book)
  }
  return (
    <div className="rounded-md  grid grid-rows-2 gap-y-2 w-72">
      <Testament
        testamentName={'Old Testament'}
        testamentTitles={bibleCache.oldTestamentBooks}
        getBookOrigin={getSelectedBookOrigin}
        testament={'oldTestament'}
      />
      <Testament
        testamentName={'New Testament'}
        testamentTitles={bibleCache.newTestamentBooks}
        getBookOrigin={getSelectedBookOrigin}
        testament={'newTestament'}
      />
    </div>
  )
}
