/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { FaHighlighter } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import ThemeContext from '../../utilities/theme-context'
const Verse = ({ verse }) => {
  const Theme = useContext(ThemeContext)
  return (
    <div
      className={`flex items-center my-1 ${!Theme.isLight ? 'hover:bg-black-soft' : 'hover:bg-gray-1'} transition hover:ease-in-out duration-300 rounded-md`}
    >
      <div className="italic mx-1">{verse.verse_number}</div>
      <div className="mx-3">{verse.verse_text}</div>
      <div className="mx-1 hover:cursor-pointer scale-90 highlight_tooltip text-slate-400 p-2">
        <FaHighlighter />
        <Tooltip anchorSelect=".highlight_tooltip" content="Highlight" place="left" />
      </div>
    </div>
  )
}

export default Verse
