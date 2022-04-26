import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import "../styles/single-post.scss"

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"] {
      title,
      _id,
      slug,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author->name,
      "authorImage": author->image
    }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return null;

  return (
    <div>
      <div className="single-post-container">
        <header>
          <div className="post-title-container">
              <h1>{singlePost.title}</h1>
              <div className="author-container">
                <img
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                  className="author-img"
                  style={{ height: "75px" }}
                />
                <p className="author-name">{singlePost.name}</p>
              </div>
          </div>
        </header>
        <div className="single-post-content">
          <img
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
              className="single-post-image"
            />
          <BlockContent
            blocks={singlePost.body}
            projectId="6v3w42bf"
            dataset="production"
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
