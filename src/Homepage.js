import React from 'react'
import styled, { css } from 'styled-components';
import './homepage.css';

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`;

export default function Homepage() {
  return (
    <div className="overall-container">
      <header>
        <h1>Ritchie Borja</h1>
      </header>
      <article>
        <div className="description">
          Hi! I recently got this domain and I am on the verge of finishing this website
          but for now, I'll just give you a simple one until I make something <a href="https://extra.ordinary.dev"><strong>extraordinary</strong></a>. I am a software engineer in Philadelphia, PA.
          Feel free to check out the links below.
        </div>
        <div className="social-links">
          <Button 
            primary
            href="https://github.com/rrborja"
          >
            GitHub
          </Button>
          <Button 
            primary
            href="https://www.linkedin.com/in/ritchieborja"
          >
            LinkedIn
          </Button>
        </div>
      </article>
    </div>
  );
}