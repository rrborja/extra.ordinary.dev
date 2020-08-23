import React, { useEffect } from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import analyticsInitializer from './analytics/analyticsInitializer';
import analyticsPageView from './analytics/analyticsPageView';
import { SocialLinkEvent, HomepageSourceCodeClickedLink } from './analytics/analyticsEvents';
import { useAnalyticsState } from './store/analytics';
import versionText from './static-version-text.json';
import './homepage.css';

const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  background: deepskyblue;
  color: white;
  border: 2px solid deepskyblue;
`;

const links = Object.freeze([
  {
    label: 'GitHub',
    linkTo: 'https://github.com/rrborja',
  },
  {
    label: 'LinkedIn',
    linkTo: 'https://www.linkedin.com/in/ritchieborja',
  },
  {
    label: 'Keybase',
    linkTo: 'https://keybase.io/brute',
  },
]);

export function getUserId() {
  let userId = localStorage.getItem('USER_ID');
  
  if (userId == null) {
    userId = uuidv4();
    localStorage.setItem('USER_ID', userId);
  }

  return userId;
}

export default function Homepage() {
  const { trackingId } = useAnalyticsState();
  const userId = getUserId();
  const pathName = window.location.pathname;
  const urlQueryString = window.location.search;

  useEffect(() => {
    analyticsInitializer(trackingId, userId);
    analyticsPageView(pathName + urlQueryString);
  }, [trackingId, userId, pathName, urlQueryString]);

  return (
    <div className="overall-container">
      <header>
        <h1>Ritchie Borja</h1>
      </header>
      <article>
        <div className="description">
          Hi! I recently got this domain and I am on the verge of finishing this website
          but for now, I'll just give you a simple one until I make something
          <a href="https://extra.ordinary.dev"> <strong>extraordinary</strong></a>. I am
          a software engineer in Philadelphia, PA. Feel free to check out the links below.
        </div>
        <div className="social-links">
          {links.map(({ label, linkTo }, i) => 
            <Button 
              key={`social-link-${i}`} 
              onClick={() => SocialLinkEvent(label)} 
              href={linkTo}
            >
              {label}
            </Button>
          )}
        </div>
      </article>
      <footer>
        <div>
          {!versionText || versionText.length === 0 ?
            'If you are reading this, that means CircleCI did not update this line.'
            : versionText[0]}
        </div>
        <div>
          <a 
            href="https://github.com/rrborja/extra.ordinary.dev" 
            onClick={() => HomepageSourceCodeClickedLink()}
          >
            Click here
          </a> to access the source code of this page.
        </div>
      </footer>
    </div>
  );
}