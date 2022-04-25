import React from 'react'
import '../styles/home.scss'
import Cover from '../images/bg-cover.png'

const Home = () => {
  return (
    <main>
        <img src={Cover} className="bg-img" alt="background img" />
    </main>
  )
}

export default Home