import React, {Component} from 'react'
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import Footer from './components/Layout/Footer'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Landing/>
        <Footer/>
      </div>
    )
  }
}

export default App
