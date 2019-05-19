import React from 'react';
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from './pages/Index'
import About from './pages/About'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'



const App = () => {
  library.add(faUpload)
  return (
    <div className="App">

      <Router>
        <Header />

        <section className="hero is-fullheight-with-navbar">
          <Body>
            <Route path="/" exact component={Index} />
            <Route path="/about" component={About} />
          </Body>
          <Footer />
        </section>
      </Router>
    </div>
  );
}

export default App;
