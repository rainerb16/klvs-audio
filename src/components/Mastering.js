import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "../styles/mastering.scss";

const Mastering = () => {
  const [masteringContent, setMasteringContent] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "mastering"] {
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
      .then((data) => setMasteringContent(data[0]))
      .catch(console.error);
  }, []);

  if (!masteringContent) return null;

  return (
    <div className="mastering-content-container">
      <h1 className="mastering-title">{masteringContent.title}</h1>
      <div className="mastering-content">
        <img
          src={masteringContent.mainImage.asset.url}
          alt={masteringContent.title}
          className="single-post-image"
        />
        <BlockContent
          blocks={masteringContent.body}
          projectId="6v3w42bf"
          dataset="production"
        />
      </div>
    </div>
  );
};

export default Mastering;
