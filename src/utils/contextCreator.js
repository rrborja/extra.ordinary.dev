import React, {createContext, useContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import reducerCreator from './reducerCreator';

export function useContextClosure(name, type, context) {
  return function useContextClosure() {
    const initializedContext = useContext(context);
    if (initializedContext === undefined) {
      throw new Error('use' + _capitalize(name) + type +
        'must be used within the ' + name +'\'s Provider');
    }
    return initializedContext;
  };
}

export function useStateClosure(identifier, stateContext) {
  const hookName = `use${identifier}State`;
  return {
    [hookName]: useContextClosure(identifier, 'State', stateContext),
  };
}

export function useDispatchClosure(identifier, dispatchContext) {
  const hookName = `use${identifier}Dispatch`;
  return {
    [hookName]: useContextClosure(identifier, 'Dispatch', dispatchContext),
  };
}

export function dispatchTransformer(actionStructure = [], dispatchAction) {
  return actionStructure.reduce(
      (acc, type) => ({
        [type]: (payload) => dispatchAction({type, payload}),
        ...acc,
      }), {});
}

export default function useContextCreator(
    name= '',
    initialState = {},
    actions = {},
) {
  if (name === '') {
    console.warn('Naming the context is recommended to identify the ' +
      'particular context.');
  } else if (typeof name !== 'string') {
    throw new Error('The value of the name to create a context must be a ' +
      'string');
  }

  if (_isEmpty(initialState)) {
    console.warn('Using a context without an initial state.');
  }

  if (_isEmpty(actions)) {
    console.warn('Even declaring an empty object of actions for the context ' +
      'is recommended if the intent is immutability.');
  }

  const StateContext = createContext(initialState);
  const DispatchContext = createContext(initialState);
  const identifier = _capitalize(name);

  const Provider = function({children}) {
    const reducer = reducerCreator(name, actions);
    const [state, dispatch] = useReducer(reducer, initialState);
    const methodNames = Object.keys(actions);
    const dispatchActions = dispatchTransformer(methodNames, dispatch);

    return (
      <StateContext.Provider value={{...state}}>
        <DispatchContext.Provider value={dispatchActions}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  Provider.propTypes = {
    children: PropTypes.element,
  };

  return Object.freeze({
    Provider,
    ...useStateClosure(identifier, StateContext),
    ...useDispatchClosure(identifier, DispatchContext),
  });
}
