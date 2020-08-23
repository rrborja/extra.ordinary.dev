import React, {createContext, useContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import reducerCreator from './reducerCreator';

/**
 * Constructs the closure for useContext
 * @param {string} name name of the context
 * @param {string} type context type of the context either State or Dispatch
 * @param {React.Context} context object within the context provider
 * @return {Function} the useContext hook
 */
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

/**
 * Constructs the closure for the useState hook
 * @param {string} identifier name of the state field
 * @param {React.Context} stateContext context of the state
 * @return {Function} the useState hook
 */
export function useStateClosure(identifier, stateContext) {
  const hookName = `use${identifier}State`;
  return {
    [hookName]: useContextClosure(identifier, 'State', stateContext),
  };
}

/**
 * Constructs the closure for the useDispatch hook
 * @param {string} identifier name of the method
 * @param {React.Context} dispatchContext context of the dispatch
 * @return {Function} the useDispatch hook
 */
export function useDispatchClosure(identifier, dispatchContext) {
  const hookName = `use${identifier}Dispatch`;
  return {
    [hookName]: useContextClosure(identifier, 'Dispatch', dispatchContext),
  };
}

/**
 * Constructs the dispatch methods
 * @param {Array} actionStructure the state's field names
 * @param {Function} dispatchAction the dispatch callback function
 * @return {Map} the dictionary of dispatch methods
 */
export function dispatchTransformer(actionStructure = [], dispatchAction) {
  return actionStructure.reduce(
      (acc, type) => ({
        [type]: (payload) => dispatchAction({type, payload}),
        ...acc,
      }), {});
}

/**
 * Constructs the useContext hook
 * @param {string} name name of the context
 * @param {Map} initialState The key-value of the initial state
 * @param {Map} actions The key-value of the methods for mutating the state
 * @return {Readonly<Object>} returns the three helper function of the context
 */
export default function useContextCreator(
    name = '',
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
