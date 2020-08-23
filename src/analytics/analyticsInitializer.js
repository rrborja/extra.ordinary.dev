import ReactGA from 'react-ga';

/**
 * Initializes the Google Analytics script
 * @param {string} trackingId UA Tracking ID of the Google Analytics account
 * @param {string} userId Unique ID of the browser user in UUID v4
 */
export default function analyticsInitializer(trackingId, userId) {
  ReactGA.initialize(trackingId);
  ReactGA.set({userId});
}
