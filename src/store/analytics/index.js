import useContextCreator from '../../utils/contextCreator';
import initialState from './state';
import dispatchActions from './action';

const {
  Provider: AnalyticsProvider,
  useAnalyticsState,
  useAnalyticsDispatch,
} = useContextCreator('Analytics', initialState, dispatchActions);

export default AnalyticsProvider;
export {
  useAnalyticsState,
  useAnalyticsDispatch,
};
