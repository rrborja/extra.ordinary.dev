import React, { createContext, useContext, useReducer } from 'react';
import reducerCreator from '../../utils/reducerCreator';
import initialState from './state';
import dispatchActions from './action';

const AnalyticsStateContext = createContext(initialState);
const AnalyticsDispatchContext = createContext(initialState);

export default function AnalyticsProvider({ children }) {
  const analyticsReducer = reducerCreator('Analytics', dispatchActions);
  const [state, dispatch] = useReducer(analyticsReducer, initialState);

  return (
    <AnalyticsStateContext.Provider value={{ ...state }}>
      <AnalyticsDispatchContext.Provider value={{ dispatch }}>
        {children}
      </AnalyticsDispatchContext.Provider>
    </AnalyticsStateContext.Provider>
  );
}

export function useAnalyticsState() {
  const context = useContext(AnalyticsStateContext);
  if (context === undefined) {
    throw new Error('useAnalyticsState must be used within the Analytics\'s Provider');
  }
  return context;
}

export function useAnalyticsDispatch() {
  const context = useContext(AnalyticsDispatchContext);
  if (context === undefined) {
    throw new Error('useAnalyticsDispatch must be used within the Analytics\'s Provider');
  }
  return context;
}