import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import ImageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import '../styles/about.scss'

const builder = ImageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const About = () => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"] {
      name,
      bio,
      "authorImage": image.asset->url
    }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return null;

  return (
    <div className="about-container">
      <h1 className="about-title">ABOUT KLVS AUDIO</h1>
      <div className="about-content-container">
        <img className="author-img" src={urlFor(author.authorImage).url()} alt={author.name} />
        <div className="about-content">
          <h3 className="author-name">{author.name}</h3>
          <BlockContent
            blocks={author.bio}
            projectId="6v3w42bf"
            dataset="production"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
