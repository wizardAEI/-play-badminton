import './App.css'
import Race from './components/v1/Race'

function App() {
  return (
      <div className='main-container'>
        <div className='court-bg'/>
        <div className='court'>
          <Race/>
        </div>
      </div>
  )
}

export default App
