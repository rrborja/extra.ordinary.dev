import ReactGA from 'react-ga';

/**
 * Triggers an analytics event for clicking the social media link
 * @param {string} label button's label to link the social media profile
 */
export function socialLinkEvent(label) {
  event('Social Links', `Clicked the ${label} link`, label);
}

/**
 * Triggers the analytics event for clicking the source code link of homepage
 */
export function homepageSourceCodeClickedLink() {
  event('Footer Links', `Clicked the homepage's source code link`);
}

/**
 * Triggers an analytics event
 * @param {string} category category of the analytics event
 * @param {string} action action of the analytics event
 * @param {string} label triggered component's label
 */
export default function event(category, action, label) {
  ReactGA.event({category, action, label});
};
