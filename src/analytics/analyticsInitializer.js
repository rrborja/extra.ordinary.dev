import ReactGA from 'react-ga';

export default function analyticsInitializer(trackingId, userId) {
  ReactGA.initialize(trackingId);
  ReactGA.set({userId});
}
