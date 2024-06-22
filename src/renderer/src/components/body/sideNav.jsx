/* eslint-disable react/prop-types */
import Testament from '../elements/testament'

export default function SideNav({ oldTestamentBooks, newTestamentBooks, getBookNumber }) {
  return (
    <div className="rounded-md  grid grid-rows-2 gap-y-2 w-72">
      <Testament
        testamentName={'Old Testament'}
        testamentTitles={oldTestamentBooks}
        getBookNumber={getBookNumber}
      />
      <Testament
        testamentName={'New Testament'}
        testamentTitles={newTestamentBooks}
        getBookNumber={getBookNumber}
      />
    </div>
  )
}
