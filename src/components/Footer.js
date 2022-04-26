import React from "react";
import { SocialIcon  } from 'react-social-icons'
import '../styles/footer.scss'

const Footer = () => {
  return (
    <>
      <div className="social-links">
        <SocialIcon
          url="https://www.facebook.com/klvsaudio"
          network="facebook"
          bgColor="#2B2B2B"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
        <SocialIcon
          url="https://www.instagram.com/klvs.audio"
          network="instagram"
          bgColor="#2B2B2B"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
        <SocialIcon
          url="https://soundcloud.com/klvsmastering"
          network="soundcloud"
          bgColor="#2B2B2B"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
        <SocialIcon
          url="mailto:info@klvsaudio.co"
          bgColor="#2B2B2B"
          className="social-item"
          target="_blank"
          style={{ height: 35, width: 35 }}
        />
      </div>
    </>
  );
};

export default Footer;
