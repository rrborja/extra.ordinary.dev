import React from 'react';
import PropTypes from 'prop-types';
import timeSince from '../utils/timeSince';

/**
 * Component for defining the Spotify Embed
 * @param {string} embedId The Track ID
 * @param {lastPlayed} title The ISO time since played
 * @return {JSX.Element} Spotify Embed iframe component
 */
export default function SpotifyEmbed({embedId, lastPlayed, type}) {
  return embedId && (
    <div className='live-player-content'>
      <h6>
        {type === 'current' ? 'Currently' : 'Recently'} listening
        since {timeSince(new Date(lastPlayed))} ago
      </h6>
      <div className='music-player'>
        <iframe
          src={`https://open.spotify.com/embed/track/${embedId}?utm_source=generator&theme=0`}
          title="Spotify"
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow={`
            autoplay;
            clipboard-write;
            encrypted-media;
            fullscreen;
            picture-in-picture
          `}>
        </iframe>
      </div>
    </div>
  );
}

SpotifyEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  lastPlayed: PropTypes.string,
  type: PropTypes.string.isRequired,
};
