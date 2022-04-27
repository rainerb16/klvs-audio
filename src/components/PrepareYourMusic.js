import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "../styles/mastering.scss"

const PrepareYourMusic = () => {
    const [ prepareMusicContent, setPrepareMusicContent ] = useState(null)

    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "prepareYourMusic"] {
          title,
          mainImage {
            asset-> {
              _id,
              url
            },
            alt
          },
         body
        }`
          )
          .then((data) => setPrepareMusicContent(data[0]))
          .catch(console.error);
      }, [])
    
      if (!prepareMusicContent) return null;

  return (
    <div className="mastering-content-container">
      <h1 className="mastering-title">{prepareMusicContent.title}</h1>
      <div className="mastering-content">
        <img
            src={prepareMusicContent.mainImage.asset.url}
            alt={prepareMusicContent.title}
            className="single-post-image"
          />
        <BlockContent
          blocks={prepareMusicContent.body}
          projectId="6v3w42bf"
          dataset="production"
        />
      </div>
    </div>
  )
}

export default PrepareYourMusic