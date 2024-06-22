import { useEffect, useState } from 'react'
import SideNav from './sideNav'
import Verses from './verses'
export default function Main() {
  const oldTestament = window.bible.OldTestament.titles()
  const newTestament = window.bible.NewTestament.titles()
  const [verses, GetVerses] = useState([])
  const [chapters, GetChapters] = useState([])
  const getBookNumber = (bookNumber) => {
    console.log(bookNumber)
  }
  // useEffect(()=>{}[verses])
  // console.log(t)
  return (
    <div id="main" className="flex flex-row items-stretch  pt-2 ">
      <SideNav
        oldTestamentBooks={oldTestament}
        newTestamentBooks={newTestament}
        getBookNumber={getBookNumber}
      />
      <div className="h-full   mx-1">
        <div className="hover:cursor-col-resize h-full flex items-center">
          <div className="bg-gray-1 w-2 h-7 rounded-lg"></div>
        </div>
      </div>
      <Verses />
    </div>
  )
}
