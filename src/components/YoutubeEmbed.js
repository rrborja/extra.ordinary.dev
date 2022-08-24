import React from 'react';
import PropTypes from 'prop-types';
import './YoutubeEmbed.css';

/**
 * Component for defining the Youtube Embed
 * @param {string} embedId The Embed ID
 * @param {string} title The title of the video
 * @param {string} caption The caption below the video
 * @return {JSX.Element} Youtube Embed iframe component
 */
export default function YoutubeEmbed({embedId, title, caption}) {
  return (
    <div className='live-player-content'>
      <div className="video-player">
        <iframe
          width="800"
          height="600"
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
          allow={`
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture
          `}
          frameBorder={0}
          allowFullScreen
          title={title}
        />
      </div>
      <h6>{caption}</h6>
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  title: PropTypes.string,
  caption: PropTypes.string,
};
