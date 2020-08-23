import ReactGA from 'react-ga';

export default function analyticsPageView(path) {
  ReactGA.pageview(path)
}