import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "../styles/mastering.scss";

const Mixing = () => {
  const [mixingContent, setMixingContent] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "mixing"] {
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
      .then((data) => setMixingContent(data[0]))
      .catch(console.error);
  }, []);

  if (!mixingContent) return null;

  return (
    <div className="mastering-content-container">
      <h1 className="mastering-title">{mixingContent.title}</h1>
      <div className="mastering-content">
        <img
          src={mixingContent.mainImage.asset.url}
          alt={mixingContent.title}
          className="single-post-image"
        />
        <BlockContent
          blocks={mixingContent.body}
          projectId="6v3w42bf"
          dataset="production"
        />
      </div>
    </div>
  );
};

export default Mixing;
