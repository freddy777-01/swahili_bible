import { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ThemeContext from '../../utilities/theme-context'
// Text Editor
const NoteBook = () => {
  const modules = {
    toolbar: [
      [
        {
          font: []
        }
      ],
      [
        {
          header: [1, 2, 3, false]
        }
      ],
      ['bold', 'italic', 'underline'],
      [
        {
          list: 'ordered'
        },
        {
          list: 'bullet'
        }
      ],
      [
        {
          color: []
        },
        {
          background: []
        }
      ],
      [
        {
          align: []
        }
      ],
      ['clean']
    ]
  }
  const [value, setValue] = useState('')
  const Theme = useContext(ThemeContext)
  return (
    <ReactQuill
      className={`editor ${Theme.isLight ? 'text-red-300' : ''}`}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  )
}

export default NoteBook
