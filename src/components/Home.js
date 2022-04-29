import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import '../styles/home.scss'
import Cover from '../images/bg-cover.png'

const Home = () => {
  const [ homeContent, setHomeContent ] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
      `*[_type == "home"] {
        title,
        body
      }`
    )
      .then((data) => setHomeContent(data[0]))
      .catch(console.error);
  }, [])

  if (!homeContent) return null;

  return (
    <>
      <div className="home-content">
        <h2 className="home-title">{homeContent.title}</h2>
        <h4 className="home-subtitle">We specialize in electronic, techno, and house music</h4>
        <div className="home-body">
          <BlockContent
              blocks={homeContent.body}
              projectId="6v3w42bf"
              dataset="production"
          />
        </div>
      </div>
      <div className="home-container">
          <img src={Cover} className="bg-img" alt="background img" />
      </div>
    </>
  )
}

export default Home