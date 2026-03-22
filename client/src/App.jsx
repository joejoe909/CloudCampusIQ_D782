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

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Network Architecture and Cloud Computing - D782</h2>
          <h2>Task 2: Network Security</h2>
          <h2>Joseph Farrish</h2>
          <p>This is a Basic MERN app for testing of Microsoft Azure services.</p>
          <ul>
            <li>
              <a href="https://github.com/joejoe909/CloudCampusIQ_D782" target="_blank">
                Git Hub Repo
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
