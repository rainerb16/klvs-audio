import { React, useEffect, useState } from "react";
import sanityClient from "../client.js";
import "../styles/work.scss";

const Work = () => {
  const [workData, setWorkData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "work"] {
      image {
        asset-> {
          _id,
          url
        },
      },
      title,
      description,
      workType,
      link,
      tags
    }`
      )
      .then((data) => setWorkData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="work-container">
      <div className="work-header">
        <h1 className="title">Our Work</h1>
      </div>
      <div className="work-card-wrapper">
        {workData &&
          workData.map((workItem, index) => {
            return (
              <div className="work-item-card" key={index}>
                <a
                  href={workItem.link}
                  alt={workItem.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="work-item-title">{workItem.title}</h3>
                </a>
                <div className="work-item-content">
                  <span>
                    <p className="work-item-type">Type: {workItem.workType}</p>
                  </span>
                  <a href={workItem.link}
                     alt={workItem.title}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                    <img src={workItem.image.asset.url} alt={workItem.title} />
                  </a>
                  <p className="work-item-description">
                    {workItem.description}
                  </p>
                  <a
                    href={workItem.link}
                    alt={workItem.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>Listen 🔊 </p>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Work;
