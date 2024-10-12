import { useContext, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import ThemeContext from '../../utilities/theme-context'

// Text Editor
//TODO => Fix Editor, in night mode functions button i.e bold,align, have to be white
//TODO => Place the Editor on its right place side nav bar

const NoteBook = () => {
  const options = {
    modules: {
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
        /* [
          {
            color: []
          },
          {
            background: []
          }
        ], */
        [
          {
            align: []
          }
        ]
        // ['clean']
      ]
    },
    placeholder: 'Compose an your Note...',
    theme: 'snow'
  }
  /* const [value, setValue] = useState('')
  const Theme = useContext(ThemeContext)
  const [range, setRange] = useState()
  const [lastChange, setLastChange] = useState()
  const [readOnly, setReadOnly] = useState(false) */

  useEffect(() => {
    new Quill('#editor', options)
    /* const load = async () => {
      ;(await import('quill/dist/quill.snow.css')).default
    }
    load().then(() => ) */
  }, [])
  // Use a ref to access the quill instance directly
  // const quillRef = useRef()

  return (
    <div className="rounded-md  w-[30rem] h-[90vh] relative border">
      <div className=" m-1 text-center flex justify-around">
        <div className="p-2 rounded-md bg-gray-1 hover:cursor-pointer w-28 text-center h-10">
          Notes
        </div>
        <div className="p-2 rounded-md bg-gray-1 hover:cursor-pointer w-28 text-center h-10">
          Write
        </div>
      </div>
      <div className="border-1 border-red-200 overflow-auto mb-3">
        <div id="editor"></div>
      </div>
      <div className="absolute bottom-5 right-5 hover:cursor-pointer bg-gray-1 p-1 rounded-md w-20 text-center font-bold">
        Save
      </div>
    </div>
  )
}

export default NoteBook
