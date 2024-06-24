import { useContext } from 'react'
import ThemeContext from '../../utilities/theme-context'
/* eslint-disable react/prop-types */
const TestamentBook = ({ bookNumber, bookName, getBookOrigin, testament }) => {
  const Theme = useContext(ThemeContext)
  //TODO : when title is clicked it has to have gray background color, as selected one

  return (
    <div
      className={`hover:shadow-md rounded-md p-1 cursor-pointer ${!Theme.isLight ? 'hover:shadow-gray-1' : ''}`}
      onClick={(e) =>
        getBookOrigin({ bookNumber: bookNumber, testament: testament, bookKey: e.clientX })
      }
    >
      {bookName}
    </div>
  )
}

export default TestamentBook
