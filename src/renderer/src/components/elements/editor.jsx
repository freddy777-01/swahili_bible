/* eslint-disable react/prop-types */
import { forwardRef, useRef } from 'react'

// Editor is an uncontrolled React component
const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null)

  return <div ref={containerRef}></div>
})

Editor.displayName = 'Editor'

export default Editor
