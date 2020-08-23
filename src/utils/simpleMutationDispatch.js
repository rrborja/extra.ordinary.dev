/**
 * Creates a simple mutation dispatch method
 * @param {Map} args the key-value of the state to be mutated
 * @return {Function} the newly constructed dispatch method
 */
export default function simpleMutationDispatch(args) {
  return simpleMutationDispatchWithPreprocessor(null, args);
}

/**
 * Like simpleMutationDispatch function, the preprocessor runs first before
 * a state is mutated
 * @see {@link simpleMutationDispatch}
 * @param {Function} preprocess runs the preprocessor before state is mutated
 * @param {Map} args the key-value of the state to be mutated
 * @return {Function} the newly constructed dispatch method after a
 * preprocessor is executed
 */
export function simpleMutationDispatchWithPreprocessor(preprocess, args) {
  if (preprocess !== null) {
    if (typeof preprocess !== 'function') {
      throw new Error('Preprocess argument must be a function');
    }

    preprocess();
  }

  return (state) => ({
    ...state,
    ...args,
  });
};
