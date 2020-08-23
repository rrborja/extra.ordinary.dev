import ReactGA from 'react-ga';

export function socialLinkEvent(label) {
  event('Social Links', `Clicked the ${label} link`, label);
}

export function homepageSourceCodeClickedLink() {
  event('Footer Links', `Clicked the homepage's source code link`);
}

export default function event(category, action, label) {
  ReactGA.event({category, action, label});
};
