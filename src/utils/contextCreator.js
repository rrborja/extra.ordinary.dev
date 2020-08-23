import React, { createContext, useContext, useReducer } from 'react';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import reducerCreator from './reducerCreator';

export function useContextClosure(name, type, context) {
  return function useContextClosure() {
    const initializedContext = useContext(context);
    if (initializedContext === undefined) {
      throw new Error(`use${_capitalize(name)}${type} must be used within the ${name}'s Provider`);
    }
    return initializedContext;
  };
}

export function dispatchTransformer(actionStructure = [], dispatchAction) {
  return actionStructure.reduce(
    (acc, type) => ({
      [type]: payload => dispatchAction({type, payload}),
      ...acc,
    }), 
  {});
}

export default function useContextCreator(name = '', initialState = {}, actions = {}) {
  if (name === '') {
    console.warn('Naming the context is recommended to identify the particular context.');
  } else if (typeof name !== 'string') {
    throw new Error('The value of the name to create a context must be a string');
  }

  if (_isEmpty(initialState)) {
    console.warn('Using a context without an initial state.');
  }

  if (_isEmpty(actions)) {
    console.warn('Even declaring an empty object of actions for the context is recommended if the intent is immutability.');
  }

  const StateContext = createContext(initialState);
  const DispatchContext = createContext(initialState);
  const identifier = _capitalize(name);

  return Object.freeze({
    Provider({ children }) {
      const methodNames = Object.keys(actions);
      const reducer = reducerCreator(name, actions);
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
        <StateContext.Provider value={{ ...state }}>
          <DispatchContext.Provider value={dispatchTransformer(methodNames, dispatch)}>
            {children}
          </DispatchContext.Provider>
        </StateContext.Provider>
      );
    },
    [`use${identifier}State`]: useContextClosure(identifier, 'State', StateContext),
    [`use${identifier}Dispatch`]: useContextClosure(identifier, 'Dispatch', DispatchContext),
  });
}