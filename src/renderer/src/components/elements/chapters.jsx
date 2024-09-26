import { useContext } from 'react'
import { BibleCache } from '../../utilities/bible-cache-provider'
import ThemeContext from '../../utilities/theme-context'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const Chapters = () => {
  const bibleCache = useContext(BibleCache)
  const Theme = useContext(ThemeContext)
  // console.log(bibleCache.chapters)
  const animatedComponents = makeAnimated()
  {
    /* <Select
    options={bibleCache.chapters}
    defaultValue={bibleCache.chapters[0]}
    components={animatedComponents}
    classNames="w-40 outline-0 border-0"
    onChange={(chapter) => bibleCache.setChapterNumber(chapter.value)}
  /> */
  }

  return (
    <select
      onChange={(chapter) => bibleCache.setChapterNumber(chapter.value)}
      className="focus:outline-none ring-slate-400 p-2"
    >
      {bibleCache.chapters.map((value, index) => (
        <option key={index} value={value.value}>
          {value.label}
        </option>
      ))}
    </select>
  )
}

export default Chapters
