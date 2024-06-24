// import { useEffect, useState } from 'react'
import SideNav from './sideNav'
import Verses from './verses'
export default function Main() {
  // const t = window.bible.NewTestament

  // useEffect(()=>{}[verses])
  // console.log(t)
  return (
    <div id="main" className="flex flex-row items-stretch  pt-2 ">
      <SideNav />
      <div className="h-full   mx-1">
        <div className="hover:cursor-col-resize h-full flex items-center">
          <div className="bg-gray-1 w-2 h-7 rounded-lg"></div>
        </div>
      </div>
      <Verses />
    </div>
  )
}
