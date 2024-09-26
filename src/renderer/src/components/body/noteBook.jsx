import { useContext, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import ThemeContext from '../../utilities/theme-context'

// Text Editor
//TODO => Fix Editor, in night mode functions button i.e bold,align, have to be white
//TODO => Place the Editor on its right place side nav bar

const NoteBook = () => {
  const options = {
    // debug: 'info',
    modules: {
      toolbar: true
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  }
  const [value, setValue] = useState('')
  const Theme = useContext(ThemeContext)
  const [range, setRange] = useState()
  const [lastChange, setLastChange] = useState()
  const [readOnly, setReadOnly] = useState(false)

  useEffect(() => {
    const quill = new Quill('#editor', options)
  }, [])
  // Use a ref to access the quill instance directly
  // const quillRef = useRef()

  return (
    <div className="w-96">
      <div id="editor"></div>
    </div>
  )
}

export default NoteBook
