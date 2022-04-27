import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "../styles/mastering.scss";

const Pricing = () => {
  const [pricingContent, setPricingContent] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "pricing"] {
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
      .then((data) => setPricingContent(data[0]))
      .catch(console.error);
  }, []);

  if (!pricingContent) return null;

  return (
    <div className="mastering-content-container">
      <h1 className="mastering-title">{pricingContent.title}</h1>
      <div className="mastering-content">
        <img
          src={pricingContent.mainImage.asset.url}
          alt={pricingContent.title}
          className="single-post-image"
        />
        <BlockContent
          blocks={pricingContent.body}
          projectId="6v3w42bf"
          dataset="production"
        />
      </div>
    </div>
  );
};

export default Pricing;
