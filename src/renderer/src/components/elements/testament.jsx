import TestamentBook from './testamentBook'
/* eslint-disable react/prop-types */
const Testament = ({ testamentName, testamentTitles, getBookNumber }) => {
  // eslint-disable-next-line react/prop-types
  return (
    <div className="border border-gray-1 rounded-md">
      <div className="border-b border-b-gray-1 text-center p-1">{testamentName}</div>
      <div className="p-1 my-1 overflow-y-scroll testament rounded-b-md scroll-bar">
        {testamentTitles.map((book, key) => (
          <TestamentBook
            key={key}
            bookNumber={book.book_number}
            bookName={book.book_name}
            getBookNumber={getBookNumber}
          />
        ))}
      </div>
    </div>
  )
}

export default Testament
