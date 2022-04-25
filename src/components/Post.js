import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import '../styles/blog.scss'

const Post = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "post"] {
        title,
        slug,
        mainImage {
          asset-> {
            _id,
            url
          },
          alt
        }
      }`)
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="title">KLVS BLOG</h1>
        <h3 className="sub-title">The more you know...</h3>
      </div>
      <div className="blog-card-wrapper">
        {postData && postData.map((post, index) => {
          return (
            <div className="blog-card" key={index}>
              <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                <span>
                  <img src={post.mainImage.asset.url} alt={post.mainImage.alt} />
                  <h3 className="blog-title">{post.title}</h3>
                </span>
              </Link>
            </div>
          )
        })}
        
      </div>
    </div>
  )
};

export default Post;
