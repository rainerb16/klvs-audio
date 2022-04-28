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
      tags,
      code,
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
                <h3 className="work-item-title">{workItem.title}</h3>
                <div className="work-item-content">
                  <span>
                    <p className="work-item-type">Type: {workItem.workType}</p>
                  </span>
                  <img src={workItem.image.asset.url} alt={workItem.title} />
                  <p className="work-item-description">
                    {workItem.description}
                  </p>
                  <p>Listen 🔊 </p>
                  {workItem && workItem.code ? (<div dangerouslySetInnerHTML={{ __html: workItem.code.code }} />) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Work;
