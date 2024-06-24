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
  return (
    <Select
      options={bibleCache.chapters}
      defaultValue={bibleCache.chapters[0]}
      components={animatedComponents}
      classNames="w-40 outline-0 border-0"
      onChange={(chapter) => bibleCache.setChapterNumber(chapter.value)}
    />
  )
}

export default Chapters
