import { useEffect, useState } from 'react'
import styles from '../assets/style.module.css'
import ThemeContext from './theme-context'

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  const [isLight, setThemeMode] = useState(true)
  const [theme, setTheme] = useState(styles.lightTheme)

  useEffect(() => setTheme(isLight ? styles.lightTheme : styles.darkTheme), [isLight])
  return (
    <ThemeContext.Provider value={{ setThemeMode, theme, isLight }}>
      {children}
    </ThemeContext.Provider>
  )
}
// export  ThemeContext
export default ThemeProvider
