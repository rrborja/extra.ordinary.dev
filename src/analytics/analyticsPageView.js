import ReactGA from 'react-ga';

/**
 * Triggers a page view analytics event
 * @param {string} path URI of the current page
 */
export default function analyticsPageView(path) {
  ReactGA.pageview(path);
}
