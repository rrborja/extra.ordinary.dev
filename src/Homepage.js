import React, {useEffect, useState, Suspense} from 'react';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';

import analyticsInitializer from './analytics/analyticsInitializer';
import analyticsPageView from './analytics/analyticsPageView';
import * as analytics from './analytics/analyticsEvents';
import {useAnalyticsState} from './store/analytics';
import versionText from './static-version-text.json';
import './homepage.css';

const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  background: #34568b;
  color: white;
  border: 2px solid #34568b;
`;

const YoutubeEmbed = React.lazy(() => import('./components/YoutubeEmbed'));
const SpotifyEmbed = React.lazy(() => import('./components/SpotifyEmbed'));

/**
 * Component for defining the header of the homepage
 * @return {JSX.Element} the header fragment
 */
function Header() {
  return (
    <React.Fragment>
      <header>
        <h1>Ritchie Borja</h1>
      </header>
    </React.Fragment>
  );
}

/**
 * Component for defining the article body of the homepage
 * @return {JSX.Element} the body fragment
 */
function Body() {
  const [links, setLinks] = useState([]);
  const [liveVideo, setLiveVideo] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    fetch('https://super.extra.ordinary.dev/homepageConfig')
        .then((response) => response.json())
        .then(({mediaPlayer, videoPlayer, socialLinks}) => {
          setLinks(socialLinks);
          setLiveVideo(videoPlayer);
          if (mediaPlayer?.display) {
            fetch('https://super.extra.ordinary.dev/currentlyListening')
                .then((response) => response.json())
                .then(setCurrentlyPlaying);
          }
        });
  }, []);

  return (
    <React.Fragment>
      <article>
        <div className="description">
          I am a software engineer in
          <a href="https://www.google.com/maps/place/Philadelphia,+PA"> Philadelphia, PA</a>.
          I play the piano most of my free time.
          <a href="https://phish.com">Ph</a>eel free to check out the links below.
          Opinions are my own.
        </div>
        {currentlyPlaying && (
          <Suspense fallback={<div></div>}>
            <SpotifyEmbed
              embedId={currentlyPlaying.trackId}
              lastPlayed={currentlyPlaying.lastPlayed}
              type={currentlyPlaying.type}
            />
          </Suspense>
        )}
        {liveVideo?.display && (
          <Suspense fallback={<div>Now streaming...</div>}>
            <YoutubeEmbed
              title={liveVideo.title}
              embedId={liveVideo.embedId}
              caption={liveVideo.caption}
            />
          </Suspense>
        )}
        <div className="social-links">
          {links.map(({label, link, display}, i) =>
            display && <Button
              key={`social-link-${i}`}
              onClick={() => analytics.socialLinkEvent(label)}
              href={link}
            >
              {label}
            </Button>,
          )}
        </div>
      </article>
    </React.Fragment>
  );
}

/**
 * Component for defining the footer of the homepage
 * @return {JSX.Element} the footer fragment
 */
function Footer() {
  return (
    <footer>
      <div>
        {!versionText || versionText.length === 0 ?
          'If you are reading this, that means CircleCI did not update ' +
          'this line.' : versionText[0]}
      </div>
      <div>
        <a
          href="https://github.com/rrborja/extra.ordinary.dev"
          onClick={() => analytics.homepageSourceCodeClickedLink()}
        >
          Click/tap here
        </a> so you know how I designed this page.
      </div>
    </footer>
  );
}

/**
 * Gets the Unique User ID from the browser for tracking purposes
 *
 * If the browser does not contain the Unique User ID, a value will be
 * generated as a UUID v4
 * @return {string} the UUID of the user
 */
export function getUserId() {
  let userId = localStorage.getItem('USER_ID');

  if (userId == null) {
    userId = uuidv4();
    localStorage.setItem('USER_ID', userId);
  }

  return userId;
}

/**
 * Component that sets the main structure of the homepage
 * @return {JSX.Element} the homepage component
 */
export default function Homepage() {
  const {trackingId} = useAnalyticsState();
  const userId = getUserId();
  const pathName = window.location.pathname;
  const urlQueryString = window.location.search;

  useEffect(() => {
    analyticsInitializer(trackingId, userId);
    analyticsPageView(pathName + urlQueryString);
  }, [trackingId, userId, pathName, urlQueryString]);

  return (
    <div className="overall-container">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}
