import { useContext } from 'react'
import { BsFillBookmarkCheckFill } from 'react-icons/bs'
import ThemeContext from '../../utilities/theme-context'
import { BibleCache } from '../../utilities/bible-cache-provider'
import Chapters from '../elements/chapters'
import Verse from '../elements/verse'
import NoteBook from './noteBook'
const Verses = () => {
  const Theme = useContext(ThemeContext)
  const bibleCache = useContext(BibleCache)
  // console.log(bibleCache.chapters)
  return (
    <div className=" rounded-md  w-full relative">
      <div
        className={`rounded-md shadow-md ${!Theme.isLight ? 'shadow-gray-1' : ''}  absolute right-5 top-2 px-2 z-10 flex items-center justify-between`}
      >
        <Chapters />
        <div
          className={`w-10 ml-2 h-9 text-lg text-center flex justify-center place-items-center cursor-pointer rounded-md hover:scale-125 transition hover:ease-in-out duration-300`}
        >
          <BsFillBookmarkCheckFill className="" />
        </div>
      </div>

      <div className="h-full overflow-y-scroll absolute pt-11 px-2 scroll-bar overflow-x-hidden">
        <NoteBook />
        {/* {bibleCache.verses.length > 0 &&
          bibleCache.verses.map((verse, key) => <Verse key={key} verse={verse} />)} */}
      </div>
    </div>
  )
}

export default Verses
