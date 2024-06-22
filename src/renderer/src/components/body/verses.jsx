import { useContext } from 'react'
import { BsFillBookmarkCheckFill } from 'react-icons/bs'
import ThemeContext from '../../utilities/theme-context'
const Verses = () => {
  const Theme = useContext(ThemeContext)
  return (
    <div className="border border-gray-1 rounded-md  w-full relative">
      Bible verses
      <div className="rounded-md border border-gray-1 w-40 absolute right-3 top-1 px-2 py-0 z-0 flex items-center justify-between">
        <select name="chapters" className="w-40 h-8 focus:border-0">
          <option value="volvo">Volvo</option>
          <option value="volvo">Volvo</option>
          <option value="volvo">Volvo</option>
          <option value="volvo">Volvo</option>
        </select>
        <div
          className={`w-9 ml-2 h-10 text-lg text-center flex justify-center place-items-center cursor-pointer rounded-md hover:shadow-md ${!Theme.isLight ? 'hover:shadow-gray-1' : ''}`}
        >
          <BsFillBookmarkCheckFill />
        </div>
      </div>
    </div>
  )
}

export default Verses
