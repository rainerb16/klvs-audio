import { BrowserRouter, Route, Routes} from 'react-router-dom'
import  Home from "./components/Home"
import  About from "./components/About"
import  SinglePost from "./components/SinglePost"
import  Post from "./components/Post"
import  Work from "./components/Work"
import Mastering from "./components/Mastering"
import PrepareYourMusic from './components/PrepareYourMusic'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Mixing from './components/Mixing'
import Pricing from './components/Pricing'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} exact="true" />
        <Route path='/about' element={<About />} />
        <Route path='/work' element={<Work/>} />
        <Route path='/mixing' element={<Mixing/>} />
        <Route path='/mastering' element={<Mastering/>} />
        <Route path='/prepare-your-music' element={<PrepareYourMusic/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/post/:slug' element={<SinglePost />} />
        <Route path='/post' element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
