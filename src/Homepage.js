import React from 'react'
import styled from 'styled-components';
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

export default function Homepage() {
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
          {links.map(({ label, linkTo }, i) => <Button href={linkTo}>{label}</Button>)}
        </div>
      </article>
      <footer>
        <div>
          {!versionText || versionText.length === 0 ?
            'If you are reading this, that means CircleCI did not update this line.'
            : versionText[0]}
        </div>
        <div>
          <a href="https://github.com/rrborja/extra.ordinary.dev">Click here</a> to access the source code of this page.
        </div>
      </footer>
    </div>
  );
}