import React from "react";
import { SocialIcon  } from 'react-social-icons'
import '../styles/footer.scss'

const Footer = () => {
  return (
    <>
      <div className="social-links">
        <SocialIcon
          url="https://www.facebook.com/klvsaudio"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
        <SocialIcon
          url="https://www.instagram.com/klvs.audio"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
        <SocialIcon
          url="https://soundcloud.com/klvsmastering"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
      </div>
    </>
  );
};

export default Footer;
