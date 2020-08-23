export default function simpleMutationDispatch(...args) {
  return simpleMutationDispatchWithPreprocessor(null, ...args);
}

export function simpleMutationDispatchWithPreprocessor(preprocess, ...args) {
  if (preprocess !== undefined || preprocess !== null) {
    if (typeof preprocess !== 'function') {
      throw new Error('Preprocess argument must be a function');
    }

    preprocess();
  }

  return state => ({
    ...state,
    ...args,
  });
};