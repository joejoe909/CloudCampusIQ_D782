import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
        </div>
        <div>
          <h1>Welcome to Cloud Campus IQ.</h1>
          <p>
             depending on your role you will see something diffrent here.
          </p>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
