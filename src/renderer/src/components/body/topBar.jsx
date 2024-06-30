import { useContext } from 'react'

import { IoMdBookmarks } from 'react-icons/io'
import { FaExclamation } from 'react-icons/fa'
import { TfiWrite } from 'react-icons/tfi'
import { IoSunny } from 'react-icons/io5'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import ThemeContext from '../../utilities/theme-context'
import { Tooltip } from 'react-tooltip'

export default function TopBar() {
  const Theme = useContext(ThemeContext)
  return (
    <div className="w-full flex flex-row justify-between border border-gray-1 rounded-md p-1">
      <div className="p-1 flex flex-row place-items-center">
        <span
          className={`p-1 rounded-full cursor-pointer about  ${Theme.isLight ? 'bg-gray-1' : 'border'} `}
          data-tooltip-id="about_tooltip"
        >
          <FaExclamation />
          <Tooltip id="about_tooltip" content="About" />
        </span>
      </div>
      <div className="w-40 flex flex-row justify-evenly ">
        <div
          data-tooltip-id="bookmarks_tooltip"
          className={`w-9 text-center flex justify-center place-items-center cursor-pointer rounded-md hover:shadow-md ${!Theme.isLight ? 'hover:shadow-gray-1' : ''}`}
        >
          <IoMdBookmarks />
          <Tooltip id="bookmarks_tooltip" content="Open Bookmarks" place="left" className="" />
        </div>
        <div
          data-tooltip-id="notes_tooltip"
          className={`w-9 text-center flex justify-center place-items-center cursor-pointer rounded-md hover:shadow-md ${!Theme.isLight ? 'hover:shadow-gray-1' : ''}`}
        >
          <TfiWrite />
          <Tooltip id="notes_tooltip" content="Take and Read Notes" place="left" />
        </div>
        <div
          data-tooltip-id="theme_mode_tooltip"
          className={`w-9 text-center flex justify-center place-items-center cursor-pointer rounded-md hover:shadow-md ${!Theme.isLight ? 'hover:shadow-gray-1' : ''}`}
          onClick={() => Theme.setThemeMode(!Theme.isLight)}
        >
          {Theme.isLight ? <IoSunny /> : <BsFillMoonStarsFill />}
          <Tooltip id="theme_mode_tooltip" content="Change Theme" />
        </div>
      </div>
    </div>
  )
}
