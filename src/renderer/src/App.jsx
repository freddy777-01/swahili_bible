import TopBar from './components/body/topBar'
import Main from './components/body/main'
import ThemeContext from './utilities/theme-context'
import { useContext } from 'react'
import { BibleCacheProvider } from './utilities/bible-cache-provider'
function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const Theme = useContext(ThemeContext)
  return (
    <BibleCacheProvider>
      <div id="app" className={`h-full w-full p-2 ${Theme.theme}`}>
        <TopBar />
        <Main />
      </div>
    </BibleCacheProvider>
  )
}

export default App
