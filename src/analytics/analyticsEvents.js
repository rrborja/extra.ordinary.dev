import ReactGA from 'react-ga';

export function SocialLinkEvent(label) {
  Event('Social Links', `Clicked the ${label} link`, label);
}

export function HomepageSourceCodeClickedLink() {
  Event('Footer Links', `Clicked the homepage's source code link`);
}

export default function Event(category, action, label) {
  ReactGA.event({ category, action, label });
};